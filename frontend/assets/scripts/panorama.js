import {
  GetAdDetailes
} from './functions/functions.js'

window.addEventListener('load', async () => {

  const image = await GetAdDetailes()
  

  const panoramaImage = new PANOLENS.ImagePanorama(image)
  const imageContainer = document.querySelector('.image-container')

  const viewer = new PANOLENS.Viewer({
    container: imageContainer,
    autoRotate: true,
    autoRotateSpeed: 0.3
  })

  viewer.add(panoramaImage)

  const loaderElem = document.querySelector('.loader')
  loaderElem.classList.add('hide')

})