# DREAM HOME - real estate project

![screenshot](https://raw.githubusercontent.com/alibkm95/DreamHome-html-css-js/main/screenshot.png)

## About project :
This project is a real estate business project for advertising properties and showing them in a 360 degrees environment. HTML, CSS and JS used for front-end and NodeJS and ExpressJS used for back-end. The list of used technologies and packages mentioned in down of the page.

## How it works ?
In order to make this project works in your local machine, you need some requirements :

- Node JS : [download and install nodeJS](https://nodejs.org/en)
- Mongo DB : [download and install MongoDB](https://www.mongodb.com/docs/manual/installation/)
- Studio 3T (a shell-centric cross-platform MongoDB management tool) : this item is optional, in case if you want to use provided database file and have no expertise to import database file from CMD or terminal, you will need this GUI. [download and install studio3T](https://robomongo.org/)
- A text editor like [vsCode](https://code.visualstudio.com/)


### clone the project :
```bash
  git clone https://github.com/alibkm95/DreamHome-html-css-js.git
```

### install dependencies : 
open you terminal and insert the following commands :
```bash
  cd ./backend
```
```bash
  npm install
```
```bash
  cd ../frontend
```
```bash
  npm install
```
```bash
  cd ../cms
```
```bash
  npm install
```

### import provided database file : 
- import DREAMHOME.agz - [importing database guide](https://studio3t.com/knowledge-base/articles/mongodb-import-json-csv-bson/)
- use BSON-mongodump archive to import
- copy your mongoURI. it must be a string like this : 
`mongodb://<username>:<password>@<host>:<port>/<database>?<options>`
in this case it must be something like this : `mongodb://myUserName:myPassword@127.0.0.1:27017/DREAMHOME?retryWrites=true&serverSelectionTimeoutMS=5000&`. if you did not set any user name and password to your connection, you dont need to `<username>:<password>@` section

### create .env :
in your text editor go to backend directory and create a file called .env and set the following variables in the file

- `MONGO_URI`=your connection string
- `COOKIE_SECRET`=encryption key for cookies. you can get a random secret from [here](https://randomkeygen.com/)
- `JWT_SECRET`=encryption key for tokens. you can get a random secret from [here](https://randomkeygen.com/)
- `EMAIL_SERVICE`=`gmail` (you can use gmail accounts for sending email in nodemailer [here](https://medium.com/@y.mehnati_49486/how-to-send-an-email-from-your-gmail-account-with-nodemailer-837bf09a7628) is a guid for setup gmail account)
- `EMAIL_HOST`=`smtp.gmail.com`
- `EMAIL_HOST_PORT`=the port of email host (usualy its 587)
- `EMAIL_AUTH_USER`=the gmail accounts user name (example@gmail.com)
- `EMAIL_AUTH_PASSWORD`=the gmail app password that you got from your google account earlier
- `ORIGIN`=`http://localhost:3000/frontend/verify.html` (this origin used to send a verification email to registered user)
- `RESET_ORIGIN`=`http://localhost:3000/frontend/resetpass.html` (this origin used to send a reset password link to requested user)
- `NODE_ENV`=`development` (in production mode it could be "production")
- `PORT`=`5000` the port of backend server works with.

### start backend server : 
open new terminal and insert following commands :
```bash
  cd ./backend
```
for development
```bash
  npm run dev
```
for production
```bash
  npm run start
```

### start frontend with live server :

go to frontend directory and find index.html and open it with live server

### <span style="color: black; background-color: yellow;">!! Attention !! </span>  
your live server extension setting must be use `3000` as port and `localhost` as host. otherwise you will get CORS errors.

### how to access CMS : 
1. if you don't using provided database, just create a new account with a valid email address. after validating your email, in user panel you can access to admins dashboard. (the first account will be considered as ROOTADMIN)
2. if you did use provided database, use the user information below:
    * ROOTADMIN: email: rootadmin@gmail.com | password: RootAdmin1
    * ADMIN: email: admin@gmail.com | password: AdminUser1
    * USER: email: testuser1@gmail.com | password: TestUser1


## Languages, technologies and packages:
<p align="center">
  <img src="https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white" alt="HTML5" />
  <img src="https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white" alt="CSS3" />
  <img src="https://img.shields.io/badge/SASS-hotpink.svg?style=for-the-badge&logo=SASS&logoColor=white" alt="SASS" />
  <img src="https://img.shields.io/badge/bootstrap-%238511FA.svg?style=for-the-badge&logo=bootstrap&logoColor=white" alt="Bootstrap" />
  <img src="https://img.shields.io/badge/SweetAlert2-red?style=for-the-badge&logo=sweetalert2&logoColor=white" alt="SweetAlert2" />
  <img src="https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E" alt="JavaScript" />
  <img src="https://a11ybadges.com/badge?logo=swiper" alt="Swiper" />
  <img src="https://img.shields.io/badge/chart.js-F5788D.svg?style=for-the-badge&logo=chart.js&logoColor=white" alt="Chart.js" />
  <img src="https://img.shields.io/badge/threejs-black?style=for-the-badge&logo=three.js&logoColor=white" alt="Threejs" />
  <img src="https://img.shields.io/badge/Panolens-pink?style=for-the-badge&logo=panolens&logoColor=white" alt="Panolens" />
  <img src="https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens" alt="JWT" />
  <img src="https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB" />
  <img src="https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white" alt="NodeJS" />
  <img src="https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB" alt="Express.js" />
  <img src="https://a11ybadges.com/badge?logo=fontawesome" alt="Font Awesome" />
  <img src="https://a11ybadges.com/badge?logo=googlefonts" alt="Google Fonts" />
</p>
