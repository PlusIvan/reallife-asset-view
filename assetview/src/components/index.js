import React from 'react';
import "../App.css";
import { RequestAPI } from "../service/request.js";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import SearchIcon from '@material-ui/icons/Search';
 

import NativeSelect from '@material-ui/core/NativeSelect';

class App extends React.Component {
state = {
  warehouse: 0,
  warehouses:[{id:1,name:'NA'}]
}
    constructor(props) {
        super(props);
        //this.state = {list: []};
        this.handleLoad = this.handleLoad.bind(this);
      }


      /**
       * On button click, crud post
       */
      async searchForm(){

        return 0;
      }

      /**
       * Function triggered by page onload. Check constructor()
       */
      async handleLoad() {
        console.log('Test on page load');

        /**
         * @type {Array}
         */
        const warehouse = await new RequestAPI(
          {headers:{'auth-token':'mbPY%UhK&u6NebnKppfr7NN54sgsc7','USER-AUTH-TOKEN':'TOKENTEST'}, data: {}, url:''}).get('armazem');

        
        this.setState((state,props) => ({warehouses: 
          warehouse.map((key) => { return {id:Number(key.armazemID),name:key.armazemNome} })
        }));


      }

      componentDidMount() {
        window.addEventListener('load', this.handleLoad);
     }
    
     componentWillUnmount() { 
       window.removeEventListener('load', this.handleLoad)  
     }

      handleChange(event){
        console.log( event.target.value)
        //this.setState((state,props) => ({warehouse:  event.target.value}));
       // this.state.setCurrency = event.target.value;
       // console.log(this.state.setCurrency);
      };

render(){

    return (
    
    <div>
        <p>Asset List</p>
        <div className="flex space-x-2">

          <TextField label="Size"  defaultValue="Part Number" size="small" />
          <TextField label="Size"  defaultValue="MAC" size="small" />
          <NativeSelect className="w-64" id="warehouse-dropdown" label="Armazem" onChange={this.handleChange}>
          {
            this.state.warehouses.map((option) => (
              <option  value={option.id} key={option.id}>{option.name}</option >
            ))
          }
          </NativeSelect>
{/*           <TextField className="w-24" id="stock-dropdown" select label="Stock">

            
          </TextField> */}
          <Button variant="contained" ><SearchIcon></SearchIcon></Button>

        </div>
        <div className="flex space-x-2 py-3">
          <TextField label="Serial Number(s)" size="small" multiline/>
          <TextField label="rlString" size="small"/>
          <TextField label="assetNumber"  size="small" />
        </div>
    </div>
      
    );
}
  



}

export default App;