import React, {Component} from 'react'
import '../css/navbar.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import {Navbar, NavItem,Dropdown, DropdownButton} from 'react-bootstrap';
import {Link} from 'react-router-dom';
// import Axios from 'axios';

class NavbarComponent extends Component {

  constructor(props){
    super(props);
  }

  async componentWillMount(){
  }

  render() {
    let homeSelect = "navbarLink", 
        aboutSelect = "navbarLink", 
        regSelect = "navbarLink", 
        contactSelect = "navbarLink", 
        faqSelect = "navbarLink",
        loginSelect = "navbarLink";

    switch (this.props.page) {
      case "home": homeSelect += " navbarSelected"; break;
      case "about": aboutSelect += " navbarSelected"; break;
      case "register": regSelect += " navbarSelected"; break;
      case "contact": contactSelect += " navbarSelected"; break;
      case "faq": faqSelect += " navbarSelected"; break;
      case "loginSelect": loginSelect += " navbarSelected"; break;
      default: break;
    }

    return (
    <Navbar expand="md" fixed="top" >
      <Navbar.Brand style={{position: 'absolute'}} >
        <Link to="/"> Icon
          {/* <img src={navbarIcon} className="d-inline-block align-top navbarIcon" alt="Frosh Week Icon"/> */}
        </Link>
      </Navbar.Brand>
      <div className="sticky-top" style={{position: 'absolute', display: 'inline-block', float: 'right', top: '2.7px',right:'0vw'}}>
        <Navbar.Toggle aria-controls="navbar-id" className="sticky-top"/>
      </div>
      <div className = "navbarTitle">
        HAPPYHOBBY
      </div>
      <Navbar.Collapse id="navbar-id" className="justify-content-center">

        <div className={homeSelect} ><NavItem><Link to="/">Home</Link></NavItem></div>
        <div className={aboutSelect}><NavItem><Link to="/about">About</Link></NavItem></div>
        <div className={contactSelect}><NavItem><Link to="/contact">Contact Us</Link></NavItem></div>
        <div className={faqSelect}><NavItem><Link to="/schedule-faq">FAQ</Link></NavItem></div>
      </Navbar.Collapse>     
    </Navbar>

    )
  }
}


export default NavbarComponent;
