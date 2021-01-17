import React, { Component } from 'react';
import NavbarComponent from '../components/navbar';
import Card from 'react-bootstrap/Card';
import { Container, Col, Row } from 'react-grid-system';
import '../css/start.css';
import Icon from "../assets/man.png";
import ImageUploading from 'react-images-uploading';


const posenet = require('@tensorflow-models/posenet');



export default class Image extends Component {
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
    this.state = { images: [] };
    this.onChange = this.onChange.bind(this);
    this.estimatePoseOnImage = this.estimatePoseOnImage.bind(this);
    this.IMG = React.createRef();
  }

  onChange = (imageList, addUpdateIndex) => {
    // data for submit
    console.log(imageList, addUpdateIndex);
    this.setState({images: imageList});
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
        <NavbarComponent page="image"/>
        <Container className="start">
          <Row>
            <Col  className = "column"> Upload 1
            </Col>
            <Col  className = "column"> Upload 2
            <ImageUploading
              multiple={false}
              value={this.state.images}
              onChange={this.onChange}
              dataURLKey="data_url">
            {({imageList, onImageUpload, onImageRemove, isDragging,dragProps,}) => (
            <div className="upload__image-wrapper">
            <button style={isDragging ? { color: 'red' } : undefined} onClick={onImageUpload} {...dragProps}>
              Click or Drop here
            </button>
            <br/>
            {imageList.map((image, index) => (
              <div key={index} className="image-item">
                <img src={image['data_url']} alt="" width="100" />
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
          <img src={Icon} id='the-img' ref={this.IMG}/>
        </Container>
        
      </div>
    )
  }
}







