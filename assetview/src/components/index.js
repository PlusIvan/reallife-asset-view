import React from 'react';
import "../App.css";
import { RequestAPI } from "../service/request.js";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import SearchIcon from '@material-ui/icons/Search';
 

import NativeSelect from '@material-ui/core/NativeSelect';

const headers = {'auth-token':'mbPY%UhK&u6NebnKppfr7NN54sgsc7','USER-AUTH-TOKEN':'TOKENTEST'};

class App extends React.Component {
    state = {
      warehouse: 0,
      warehouses:[{id:1,name:'NA'}],
      stock: 0,
      stocks: [{id:0,name:'NA'}],
      state: 0,
      states: [{id:0,name:'NA'}]
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

        const [
          partNumber,
          MAC,
          selectedWareHouseId,
          selectedStockId,
          serialNumbers,
          rlString,
          assetNumber,
          selectedStateId
        ] = [
          document.getElementById("partNumber").value,
          document.getElementById("MAC").value,
          document.getElementById("warehouse-dropdown").value,
          document.getElementById("stock-dropdown").value,
          document.getElementById("serialNumbers").value,
          document.getElementById("rlString").value,
          document.getElementById("assetNumber").value,
          document.getElementById("states-dropdown").value
        ];


        const body = {
          MAC: MAC,
          serialNumber: (/[,\-]/.test(serialNumbers)) ? [...serialNumbers.split(',')] : serialNumbers,
          assetNumber: (/[,\-]/.test(assetNumber)) ? [...assetNumber.split(',')] : assetNumber,
          partNumber: partNumber.toString(),
          rlString: rlString.toString(),
          stockID: Number(selectedStockId),
          armazemID: Number(selectedWareHouseId),
          stateID: Number(selectedStateId)
        }

        const crudPost = await new RequestAPI({headers:headers,body:body}).post("search");

        console.log(crudPost);


      }

      /**
       * Function triggered by page onload. Check constructor()
       */
      async handleLoad() {
        console.log('Test on page load');

        /**
         * @type {Array}
         */
        const warehouse = await new RequestAPI({headers:headers,body:{isActive: 1}}).post('armazem');

        this.setState((state,props) => ({warehouses: 
          warehouse.map((key) => { return { id:Number(key.armazemID),name:key.armazemNome} })
        }));

        /**
         * @type {Array}
         */
        const stock = await new RequestAPI({headers:headers,body:{isActive: 1}}).post('stock');
        
        this.setState((state,props) => ({stocks: 
          stock.map((key) => { return { id:Number(key.stockID),name:key.stockNome} })
        }));


        /**
         * @type {Array}
         */
        const states = await new RequestAPI({headers:headers,body:{isActive: 1}}).post('state');
        
        this.setState((state,props) => ({states: 
          states.map((key) => { return { id:Number(key.assetStateID),name:key.assetStateNome} })
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

          <TextField label="Part Number" size="small" id="partNumber"/>
          <TextField label="MAC" size="small" id="MAC"/>
          <NativeSelect className="w-64" id="warehouse-dropdown" label="Armazem" onChange={this.handleChange}>
          {
            this.state.warehouses.map((option) => (
              <option  value={option.id} key={option.id}>{option.name}</option >
            ))
          }
          </NativeSelect>
          <NativeSelect className="w-64" id="stock-dropdown" label="Stock">
          {
            this.state.stocks.map((option) => (
              <option  value={option.id} key={option.id}>{option.name}</option >
            ))
          }
          </NativeSelect>
{/*           <TextField className="w-24" id="stock-dropdown" select label="Stock">

            
          </TextField> */}
          <Button variant="contained" onClick={this.searchForm}><SearchIcon></SearchIcon></Button>

        </div>
        <div className="flex space-x-2 py-3">
          <TextField label="Serial Number(s)" size="small" multiline id="serialNumbers"/>
          <TextField label="assetNumber"  size="small" multiline id="assetNumber"/>
          <TextField label="rlString" size="small" id="rlString"/>
          <NativeSelect className="w-64" id="states-dropdown" label="Stock">
          {
            this.state.states.map((option) => (
              <option  value={option.id} key={option.id}>{option.name}</option >
            ))
          }
          </NativeSelect>
        </div>
    </div>
      
    );
}
  



}

export default App;