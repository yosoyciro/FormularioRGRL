import axios from 'axios';

var url = ''
switch (process.env.NODE_ENV) {
  case 'development':
    //url = `http://UN-PARAPROBAR:8181/api/`
    url = `https://localhost:44332/api/`
    break;

  case 'production':
    //url = `http://artmutualrural.com.ar:8181/api/`
    url = `http://binarianet.com:8181/api/`
    break;

  default:
    break;
}

export default axios.create({
    baseURL: url  
});