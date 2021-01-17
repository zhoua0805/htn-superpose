import React, { Component } from 'react';
import NavbarComponent from '../components/navbar';
import Card from 'react-bootstrap/Card';
import { Container, Col, Row } from 'react-grid-system';
import '../css/start.css';
import Icon from "../assets/man.png";
import ImageUploading from 'react-images-uploading';
import getSimilarity from '../components/pose-estimator';


const posenet = require('@tensorflow-models/posenet');



export default class Image extends Component {
  constructor(props) {
    super(props);
    this.state = { myImage: [],
                  targetImage: [] };
    this.onChangeOne = this.onChangeOne.bind(this);
    this.onChangeTwo = this.onChangeTwo.bind(this);
    this.onChangeRunButton = this.onChangeRunButton.bind(this);
    this.estimatePoseMatch = this.estimatePoseMatch.bind(this);
    this.myImageRef = React.createRef();
    this.targetImageRef = React.createRef();
  }

  componentDidMount(){
    window.scrollTo(0,0);
  }

  onChangeOne = (imageList, addUpdateIndex) => {
    // data for submit
    console.log(imageList, addUpdateIndex);
    this.setState({myImage: imageList});
  }

  onChangeTwo = (imageList, addUpdateIndex) => {
    // data for submit
    console.log(imageList, addUpdateIndex);
    this.setState({targetImage: imageList});
  }

  onChangeRunButton() {
    var myImageElement = this.myImageRef.current;
    var targetImageElement = this.targetImageRef.current;
    getSimilarity(myImageElement, targetImageElement);
    // const pose = this.estimatePoseMatch(myImageElement);
    // console.log(pose);
  }

  async estimatePoseMatch(imageElement) {
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
        <NavbarComponent page="image"/>
        <Container className="start">
          <Row>
            <Col  className = "column"> Upload 1
            <ImageUploading
              multiple={false}
              value={this.state.myImage}
              onChange={this.onChangeOne}
              dataURLKey="data_url">
            {({imageList, onImageUpload, onImageRemove, isDragging,dragProps,}) => (
            <div className="upload__image-wrapper">
            <button style={isDragging ? { color: 'red' } : undefined} onClick={onImageUpload} {...dragProps}>
              Click or Drop here
            </button>
            <br/>
            {imageList.map((image, index) => (
              <div key={index} className="image-item">
                <img src={image['data_url']} alt="" width="200" ref={this.myImageRef} />
                <div className="image-item__btn-wrapper">
                  <button onClick={() => onImageRemove(index)}>Remove</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </ImageUploading>
            </Col>



            <Col  className = "column"> Upload 2
            <ImageUploading
              multiple={false}
              value={this.state.targetImage}
              onChange={this.onChangeTwo}
              dataURLKey="data_url">
            {({imageList, onImageUpload, onImageRemove, isDragging,dragProps,}) => (
            <div className="upload__image-wrapper">
            <button style={isDragging ? { color: 'red' } : undefined} onClick={onImageUpload} {...dragProps}>
              Click or Drop here
            </button>
            <br/>
            {imageList.map((image, index) => (
              <div key={index} className="image-item">
                <img src={image['data_url']} alt="" width="200" ref={this.targetImageRef} />
                <div className="image-item__btn-wrapper">
                  <button onClick={() => onImageRemove(index)}>Remove</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </ImageUploading>
            </Col>
          </Row>
        </Container>


        <button onClick={() => this.onChangeRunButton()}>Run</button>
      </div>
    )
  }
}







