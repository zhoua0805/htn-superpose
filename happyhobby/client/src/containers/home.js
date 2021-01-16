import React, { Component } from 'react';
import NavbarComponent from '../components/navbar';

export default class Home extends Component {
  componentDidMount(){window.scrollTo(0,0)}
  render() { 
    return (
      <div>
        <NavbarComponent page="home"/>
        <div className="home" style={{"overflow-x": "hidden"}}>
          Hello there!
        </div>
      </div>
    )
  }
}