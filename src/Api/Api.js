import axios from 'axios';

var url = ''
switch (process.env.NODE_ENV) {
  case 'development':
    url = `http://192.168.0.156:8181/api/`
    break;

  case 'production':
    url = `http://www.binarianet.com:8181/api/`
    break;

  default:
    break;
}
//console.log('ENV: ' + process.env.NODE_ENV)
//console.log('url: ' + url)
export default axios.create({
  //baseURL: `http://192.168.0.156:8181/api/`
  baseURL: url  
});