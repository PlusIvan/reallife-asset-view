import React from 'react';
import "../App.css";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from '@material-ui/icons/Search';
import { RequestAPI } from "../service/request.js";

let list = [];
const head = {headers:{'auth-token':'mbPY%UhK&u6NebnKppfr7NN54sgsc7','user-id':2}};
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {list: []};
      }
     
  async modify(){
    const  [keep, remove] = [
        (document.querySelector(`input[name="keep"]:checked`)) ? document.querySelector(`input[name="keep"]:checked`).value: false,
        (document.querySelector(`input[name="delete"]:checked`)) ? document.querySelector(`input[name="delete"]:checked`).value: false
    ];

    if(!keep || !remove || keep == remove)
        return alert('Invalid');
    
    await new RequestAPI({...head,url:`merge/${keep}/${remove}`}).get();
    alert('Request sent')
  }

  async Search(){
    const req = await new RequestAPI({...head,url:'duplicated'}).post();
    list = req.data;
    this.setState((state,props) => ({list: req.data}));
  }

  renderTableContent(){
      return this.state.list.map((key) => {
        return(
            <tr>
                <td>
                    <input type="radio" name="keep" value={key.clientID}/>
                </td>
                <td>
                    <input type="radio" name="delete" value={key.clientID}/>
                </td>
                <td>{key.clientID}</td>
                <td>{key.clientNome}</td>
                <td>{key['NIF']}</td>
            </tr>
        )
      })
  }

render(){
    return (
       <div>

</div>
      
    );
}
  



}

export default App;