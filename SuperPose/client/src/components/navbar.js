import React, {Component} from 'react';
import '../css/navbar.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Navbar, NavItem,Dropdown, DropdownButton} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import navbarIcon from '../assets/logo.svg';
// import Axios from 'axios';

class NavbarComponent extends Component {

  constructor(props){
    super(props);
  }

  async componentWillMount(){
  }

  render() {
    let imageSelect = "navbarLink", 
        videoSelect = "navbarLink", 
        CommunitiesSelect = "navbarLink";

    switch (this.props.page) {
      case "image": imageSelect += " navbarSelected"; break;
      case "video": videoSelect += " navbarSelected"; break;
      case "communities": CommunitiesSelect += " navbarSelected"; break;
      default: break;
    }

    return (
    <Navbar expand="md" fixed="top" >
      <Navbar.Brand style={{position: 'absolute'}} >
        <Link to="/"> 
          <img src={navbarIcon} className="d-inline-block align-top navbarIcon" alt="Frosh Week Icon"/> 
        </Link>
      </Navbar.Brand>
      <div className="sticky-top" style={{position: 'absolute', display: 'inline-block', float: 'right', top: '2.7px',right:'0vw'}}>
        <Navbar.Toggle aria-controls="navbar-id" className="sticky-top"/>
      </div>
      <div className = "navbarTitle">
        SUPERPOSE
      </div>
      <Navbar.Collapse id="navbar-id" className="justify-content-center">

        <div className={imageSelect} ><NavItem><Link to="/">SuperPose</Link></NavItem></div>
        {/* <div className={videoSelect}><NavItem><Link to="/video">Video</Link></NavItem></div>
        <div className={CommunitiesSelect}><NavItem><Link to="/contact">Communities</Link></NavItem></div> */}
      </Navbar.Collapse>     
    </Navbar>

    )
  }
}


export default NavbarComponent;
