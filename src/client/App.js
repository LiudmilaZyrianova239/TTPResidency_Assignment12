
import React, { Component } from 'react';
import axios from 'axios';

export default class App extends Component {
  constructor (props){
    super (props);
    this.state = {
      page: 1,
      campuses: [] ,
      students: [],
    };
    this.handleClickCampus = this.handleClickCampus.bind(this);
    this.handleClickStudent = this.handleClickStudent.bind(this);
    this.handleClickHome = this.handleClickHome.bind(this);
  }

  componentDidMount() {
    console.log('Component did mount');


  }

  handleClickHome() {
    this.setState ({
      page : 1,
    });
  }

  handleClickCampus() {
    this.setState ({
      page : 2,
    });
    axios.get('http://localhost:3000/api/input/campus')
    .then(response => {
      this.setState({ campuses: response.data});
    });

  }

  handleClickStudent() {
    this.setState ({
      page : 3,
    });
    axios.get('http://localhost:3000/api/input/student')
    .then(response => {
      console.log(response.data);
      this.setState({ students: response.data });
    });
  }

  render() {
    if (this.state.page == 1){
      return (
        <div>
          <button className= "button" onClick={this.handleClickCampus}>Campuses</button>
          <button className= "button" onClick={this.handleClickStudent}>Student</button>
        </div>
      );
    };
    if (this.state.page == 2){
     var campuses = this.state.campuses.map((each)=>
        <ParticularCampus data={JSON.stringify(each, null, '\t')}/>
      );
    return (
      <div>
        <h3>Campuses: </h3>
        {campuses ? <p>{campuses}</p> : <h1>Loading.. please wait2!</h1>} <br/>
        <button className= "button" onClick={this.handleClickHome}>Home page</button>
      </div>
    );
    };
    if (this.state.page == 3){
      var students = this.state.students.map((each)=>
      <ParticularStudent data={JSON.stringify(each, null, '\t')}/>
    );
      return (
        <div>
          <h3>Students: </h3>
          {students? <p>{students}</p> : <h1>Loading.. please wait3!</h1>}<br/>
        <button className= "button" onClick={this.handleClickHome}>Home page</button>
        </div>
      );
      };

  }
}




class ParticularCampus extends Component {
  render(){
    return (
      <div>
        <p>{this.props.data}</p>
      </div>
    );
  }
}

class ParticularStudent extends Component {
  render(){
    return (
      <div>
        <p>{this.props.data}</p>
      </div>
    );
  }
}
