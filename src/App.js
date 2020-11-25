import React, {Component} from 'react';
//eslint-disable-next-line
import Particles from 'react-particles-js';
import Clarifai from "clarifai";
import './App.css';
import Navigation from "./components/navigation/Navigation";
import Logo from "./components/logo/logo";
import ImageLinkForm from "./components/imageLinkForm/ImageLinkForm";
import Rank from "./components/rank/Rank";
import FaceRecognition from "./components/faceRecognition/FaceRecognition"


const app = new Clarifai.App({
  apiKey: '262a90ad94db45c5aed573dfc429f3f8'
 });

class App extends Component {
  constructor(){
    super();
    this.state = {
      input: '',
      imageURL: ''
    }
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  onButtonSubmit = () => {
    this.setState({imageURL : this.state.input})
    app.models.predict(
      Clarifai.FACE_DETECT_MODEL,
      this.state.input)
      .then(
      function(response){
        //do sth
        console.log(response.outputs[0].data.regions[0].region_info.bounding_box)
      },
      function(err){
        // if there was an error
        console.log(err)
      }
    );
  }

  render(){
  return (
    <div className="App">
      {/*
       <Particles 
          className="particles" 
          params={{
            		particles: {
            			line_linked: {
            				shadow: {
            					enable: true,
            					color: "#3CA9D1",
            					blur: 15
            				}
            			}
            		}
            	}}
          /> 
          */}
      <Navigation />
      <Logo />
      <Rank />
      <ImageLinkForm 
        onInputChange={this.onInputChange} 
        onButtonSubmit={this.onButtonSubmit}
      />
      <FaceRecognition 
        imageURL={this.state.imageURL}
      />
    </div> 
  );
}
} 

export default App;
