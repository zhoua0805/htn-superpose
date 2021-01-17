import React, { Component } from 'react';
import NavbarComponent from '../components/navbar';
import Card from 'react-bootstrap/Card';
import { Col, Row } from 'react-grid-system';
import '../css/start.css';
import Icon from "../assets/man.png";

const posenet = require('@tensorflow-models/posenet');



export default class Video extends Component {
  componentDidMount(){
    window.scrollTo(0,0);
    console.log('Image element: ');
    const imageElement = this.IMG.current;
    console.log(imageElement);
    const pose = this.estimatePoseOnImage(imageElement);
    console.log(pose);
  }
    
  constructor(props) {
    super(props);
    this.estimatePoseOnImage = this.estimatePoseOnImage.bind(this);
    this.IMG = React.createRef();
  }

  async estimatePoseOnImage(imageElement) {
    // load the posenet model from a checkpoint
    const net = await posenet.load();
    const pose = await net.estimateSinglePose(imageElement, {
      flipHorizontal: false
    });
    return pose;
  }

  render() { 
    return (
      <div>
        <NavbarComponent page="video"/>
        <img src={Icon} id='the-img' ref={this.IMG}/>
      </div>
    )
  }
}