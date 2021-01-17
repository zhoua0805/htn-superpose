import React, { Component } from 'react';
import NavbarComponent from '../components/navbar';
import Card from 'react-bootstrap/Card';
import { Container, Col, Row } from 'react-grid-system';
import '../css/start.css';
import Icon1 from "../assets/cat.png";
import Icon2 from "../assets/cat2.jpg";
import Icon3 from "../assets/cat3.jpg";
import ImageUploading from 'react-images-uploading';
import getSimilarity from '../components/pose-estimator';


const posenet = require('@tensorflow-models/posenet');

const BODYPARTS = ["nose","leftEye", "rightEye", "leftEar", "rightEar", "leftShoulder", "rightShoulder", "leftElbow", "rightElbow", "leftWrist", "rightWrist", "leftHip", "rightHip",	"leftKnee",	"rightKnee",	"leftAnkle","rightAnkle",]

export default class Image extends Component {
  constructor(props) {
    super(props);
    this.state = { myImage: [],
                  targetImage: [], 
                  pose: undefined};
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

  async onChangeRunButton() {
    var myImageElement = this.myImageRef.current;
    var targetImageElement = this.targetImageRef.current;
    var pose = await getSimilarity(myImageElement, targetImageElement);
    console.log(pose);
    const result = {message: "", best: "", worst: "", img: ""}
    if (pose.result >0.25){
      result.message = "Needs More Work!"
      result.img = Icon3;
    }else if (pose.result > 0.15){
      result.message = "Almost there!"
      result.img = Icon2;
    }else{
      result.message = "Excellent!"
      result.img = Icon1;
    }

    var indexOfMaxValue = pose.error.reduce((iMax, x, i, arr) => x > arr[iMax] ? i : iMax, 0);
    var indexOfMinValue = pose.error.reduce((iMin, x, i, arr) => x > arr[iMin] ? iMin : i, 0);

    console.log(indexOfMaxValue);
    result.best = BODYPARTS[Math.floor(indexOfMaxValue / 2)];
    result.worst = BODYPARTS[Math.floor(indexOfMinValue/ 2)];
    this.setState({pose: result});
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
            <Col  className = "column"> Please upload your personal image here
            <ImageUploading
              multiple={false}
              value={this.state.myImage}
              onChange={this.onChangeOne}
              dataURLKey="data_url">
            {({imageList, onImageUpload, onImageRemove, isDragging,dragProps,}) => (
            <div className="upload__image-wrapper" >
            <button class="btn btn-primary mybutton" type="button" style={isDragging ? { color: 'red' } : undefined} onClick={onImageUpload} {...dragProps}>
              Click or Drop here
            </button>
            <br/>
            {imageList.map((image, index) => (
              <div key={index} className="image-item">
                <img src={image['data_url']} alt="" width="200" ref={this.myImageRef} />
                <div className="image-item__btn-wrapper">
                  <button class="btn btn-primary removeButton" type="button" onClick={() => onImageRemove(index)}>Remove</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </ImageUploading>
            </Col>



            <Col  className = "column"> Please upload the pro (target) image here
            <ImageUploading
              multiple={false}
              value={this.state.targetImage}
              onChange={this.onChangeTwo}
              dataURLKey="data_url">
            {({imageList, onImageUpload, onImageRemove, isDragging,dragProps,}) => (
            <div className="upload__image-wrapper">
            <button class="btn btn-primary mybutton" type="button" style={isDragging ? { color: 'red' } : undefined} onClick={onImageUpload} {...dragProps}>
              Click or Drop here
            </button>
            <br/>
            {imageList.map((image, index) => (
              <div key={index} className="image-item">
                <img src={image['data_url']} alt="" width="200" ref={this.targetImageRef} />
                <div className="image-item__btn-wrapper">
                  <button class="btn btn-primary removeButton" type="button" onClick={() => onImageRemove(index)}>Remove</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </ImageUploading>
            </Col>
          </Row>

          <button type="button" class="btn btn-primary btn-lg" onClick={() => this.onChangeRunButton()}>Compare</button>
        </Container>
        {this.state.pose? <div className = "results"> <Row>
          <Col>
          <img src={this.state.pose.img}  width="400"/>
          </Col>
          <Col>
          <h1>{this.state.pose.message} </h1>
          <h3>You did great on: {this.state.pose.best}</h3>
          <h3>You should improve on: {this.state.pose.worst}</h3>
          </Col>
        </Row>
        </div> :undefined}
      </div>
    )
  }
}







