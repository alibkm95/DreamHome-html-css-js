const Ads = require('../models/Ads')
const Views = require('../models/Views')
const Token = require('../models/Token')
const { isTokenValid } = require('../utils');
const { StatusCodes } = require('http-status-codes')
const CustomError = require('../errors')
const fs = require('fs')
const path = require('path')

const createNewAd = async (req, res) => {

  req.body.creator = req.user.userId

  const {
    title,
    area,
    propType,
    adType,
    cover,
    panorama,
    rooms,
    description,
  } = req.body

  if (
    !title ||
    !area ||
    !propType ||
    !adType ||
    !cover ||
    !panorama ||
    !rooms ||
    !description
  ) {
    throw new CustomError.BadRequestError('necessary fields are not provided')
  }

  try {
    const ad = await Ads.create(req.body)
    res.status(StatusCodes.CREATED).json({ ad, msg: 'ad created successfully' })
  } catch (error) {
    throw new CustomError.BadRequestError('creating new ad failed')
  }
}

const getAllAds = async (req, res) => {

  const {
    propType,
    adType,
    sort,
    search,
    publish
  } = req.query

  const { refreshToken, accessToken } = req.signedCookies

  if (accessToken) {
    const payload = isTokenValid(accessToken)
    req.user = payload.user
  } else if (refreshToken) {
    const payload = isTokenValid(refreshToken)

    const existingToken = await Token.findOne({
      user: payload.user.userId,
      refreshToken: payload.refreshToken
    })

    if (existingToken || existingToken?.isValid) {
      req.user = payload.user
    }
  } else {
    req.user = null
  }

  let queryObject = {}

  if (propType && propType !== 'all') {
    queryObject.propType = propType
  }

  if (adType && adType !== 'all') {
    queryObject.adType = adType
  }

  if (req.user?.role === 'ROOTADMIN' || req.user?.role === 'ADMIN') {
    if (publish && publish === 'true') {
      queryObject.publish = true
    }

    if (publish && publish === 'false') {
      queryObject.publish = false
    }

    if(publish && publish !== 'true' && publish !== 'false' && publish !== 'all') queryObject.publish = true

  } else {
    queryObject.publish = true
  }

  if (search) {
    queryObject.title = { $regex: search, $options: 'i' }
  }

  let result = Ads.find(queryObject)

  if (sort && sort === 'newest') {
    result = result.sort('-createdAt')
  }

  if (sort && sort === 'most-viewed') {
    result = result.sort('-views')
  }

  if (sort && sort === 'a-z') {
    result = result.sort('title')
  }

  if (sort && sort === 'z-a') {
    result = result.sort('-title')
  }

  if (!sort) {
    result = result.sort('-createdAt')
  }

  const page = Number(req.query.page) || 1
  const limit = Number(req.query.itemPerPage) || 12
  const skip = (page - 1) * limit

  result = result.skip(skip).limit(limit)

  const ads = await result

  const totalAds = await Ads.countDocuments(queryObject)
  const numOfPages = Math.ceil(totalAds / limit)

  res.status(StatusCodes.OK).json({ ads, totalAds, numOfPages })
}

const getSingleAd = async (req, res) => {

  const { id: adId } = req.params
  
  const { refreshToken, accessToken } = req.signedCookies

  if (accessToken) {
    const payload = isTokenValid(accessToken)
    req.user = payload.user
  } else if (refreshToken) {
    const payload = isTokenValid(refreshToken)

    const existingToken = await Token.findOne({
      user: payload.user.userId,
      refreshToken: payload.refreshToken
    })

    if (existingToken || existingToken?.isValid) {
      req.user = payload.user
    }
  } else {
    req.user = null
  }

  const ad = await Ads.findOne({ _id: adId })

  if (!ad) {
    throw new CustomError.NotFoundError('there is no such an ad')
  }

  if (req.user?.role !== 'ROOTADMIN' && req.user?.role !== 'ADMIN') {
    try {
      await Views.create({ ad: adId })
    } catch (error) {
      console.log(error)
    }

    ad.views = ad.views + 1
    await ad.save()
  }

  res.status(StatusCodes.OK).json({ ad })

}

const updateAd = async (req, res) => {

  const { id: adId } = req.params

  const ad = await Ads.findOneAndUpdate(
    { _id: adId },
    req.body,
    { new: true, runValidators: true }
  )

  if (!ad) {
    throw new CustomError.NotFoundError('there is no such an ad')
  }

  res.status(StatusCodes.OK).json({ ad })
}

const uploadAdImage = async (req, res) => {

  const imgDirectory = path.join(__dirname, '../public/uploads/adsImages');

  if (!fs.existsSync(imgDirectory)) {
    fs.mkdirSync(imgDirectory);
  }

  if (!req.files) {
    throw new CustomError.BadRequestError('no file selected for upload');
  }

  const image = req.files.image;

  if (!image.mimetype.startsWith('image')) {
    throw new CustomError.BadRequestError('only image files allowed(*.png  *.jpg)');
  }

  const maxSize = 1024 * 1024 * 10;

  if (image.size > maxSize) {
    throw new CustomError.BadRequestError('selected file size must be less than 10 MB');
  }

  image.name = image.name.replaceAll(' ', '_');

  const fileName = `${new Date().getTime()}_${image.name}`;

  const imagePath = path.join(__dirname, `../public/uploads/adsImages/${fileName}`);

  try {
    await image.mv(imagePath);
  } catch (error) {
    throw new CustomError.BadRequestError('upload file error')
  }

  res.status(StatusCodes.OK).json({ image: `${req.protocol}://${req.get('host')}/uploads/adsImages/${fileName}` })
}

const deleteAd = async (req, res) => {

  const { id: adId } = req.params

  const ad = await Ads.findOne({ _id: adId })

  if (!ad) {
    throw new CustomError.NotFoundError('there is no such an ad')
  }

  const coverImage = ad.cover
  const coverImagePath = path.parse(coverImage);
  const panoramaImage = ad.panorama
  const panoramaImagePath = path.parse(panoramaImage);

  if (fs.existsSync(path.join(__dirname, `../public/uploads/adsImages/${coverImagePath.base}`))) {
    fs.unlinkSync(path.join(__dirname, `../public/uploads/adsImages/${coverImagePath.base}`), err => {
      if (err) console.log(err)
    })
  }

  if (fs.existsSync(path.join(__dirname, `../public/uploads/adsImages/${panoramaImagePath.base}`))) {
    fs.unlinkSync(path.join(__dirname, `../public/uploads/adsImages/${panoramaImagePath.base}`), err => {
      if (err) console.log(err)
    })
  }

  await ad.remove()

  res.status(StatusCodes.OK).json({ msg: 'ad removed successfully' })
}

module.exports = {
  createNewAd,
  getAllAds,
  getSingleAd,
  updateAd,
  uploadAdImage,
  deleteAd
}