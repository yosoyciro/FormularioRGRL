import axios from 'axios';

/*async function readConfig() {
  const response = await fetch("/config.json", {
    headers : { 
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }})    
    
    console.log('Response', response);
}

var url = await readConfig();*/
let url = '';

switch (process.env.NODE_ENV) {
  case 'development':
    //url = `http://UN-PARAPROBAR:8181/api/`
    url = `https://localhost:44332/api/`
    break;

  case 'production':
    url = `http://www.artmutualrural.org.ar:8181/api/`
    //url = `http://www.intersistemas.net:8181/api/`
    //url = configData.URL
         
    break;

  default:
    break;
}

console.log('URL API: ' + url)
export default axios.create({
    baseURL: url  
});
