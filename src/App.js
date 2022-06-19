import React, { Component } from 'react';
import './App.css';

class App extends Component {

  constructor(props){
    super(props);
    this.state={
      title: 'Sign-In',
      act: 0,
      index: '',
      datas: []
    }
  } 

  componentDidMount(){
    this.refs.name.focus();
  }

  fSubmit = (e) =>{
    e.preventDefault();
    console.log('try');

    let datas = this.state.datas;
    let name = this.refs.name.value;
    let surname = this.refs.surname.value;
    let address = this.refs.address.value;
    let email = this.refs.email.value;
    let password = this.refs.password.value;
    

    if(this.state.act === 0){   //new
      let data = {
        name, surname, address, email, password
      }
      datas.push(data);
    }else{                      //update
      let index = this.state.index;
      datas[index].name = name;
      datas[index].surname = surname;
      datas[index].address = address;
      datas[index].email = email;
      datas[index].password = password;

    }    

    this.setState({
      datas: datas,
      act: 0
    });

    this.refs.myForm.reset();
    this.refs.name.focus();
  }

  fRemove = (i) => {
    let datas = this.state.datas;
    datas.splice(i,1);
    this.setState({
      datas: datas
    });

    this.refs.myForm.reset();
    this.refs.name.focus();
  }

  fEdit = (i) => {
    let data = this.state.datas[i];
    this.refs.name.value = data.name;
    this.refs.name.value = data.surname;
    this.refs.address.value = data.address;
    this.refs.email.value = data.email;
    this.refs.password.value = data.password;
    

    this.setState({
      act: 1,
      index: i
    });

    this.refs.name.focus();
  }  

  render() {
    let datas = this.state.datas;
    return (
      <div className="App">
        <h2>{this.state.title}</h2>
        <form ref="myForm" className="myForm">
          <input type="text" ref="name" placeholder="Enter your name" className="formField" />
          <input type="text" ref="surname" placeholder="Enter your surname" className="formField" />
          <input type="text" ref="address" placeholder="Enter your address" className="formField" />
          <input type="text" ref="email" placeholder="Enter your email" className="formField" />
          <input type="text" ref="password" placeholder="Enter your password" className="formField" />
          <button onClick={(e)=>this.fSubmit(e)} className="myButton">Sign In </button>
        </form>
        <pre>
          {datas.map((data, i) =>
            <li key={i} className="myList">
              {i+1}. {data.name}, {data.surname}, {data.address}, {data.email}, {data.password}
              <button onClick={()=>this.fRemove(i)} className="myListButton">remove </button>
              <button onClick={()=>this.fEdit(i)} className="myListButton">edit </button>
            </li>
          )}
        </pre>
      </div>
    );
  }
}

export default App;