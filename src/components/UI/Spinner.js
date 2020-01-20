import React from 'react';
import Loader from 'react-loader-spinner';

 export default class App extends React.Component {
   //other logic
   render() {
      console.log('spinner')
      return <div>
         <label>Procesando informacion...</label>
         <Loader
            type="Rings"
            color="#00BFFF"
            height={120}
            width={120}
            timeout={60000} //3 secs
         />
      </div>       
   }
}