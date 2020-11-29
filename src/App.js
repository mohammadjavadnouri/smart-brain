import React, {Component} from 'react';
//eslint-disable-next-line
import Particles from 'react-particles-js';
import Clarifai from "clarifai";
import './App.css';
import Navigation from "./components/navigation/Navigation";
import Logo from "./components/logo/logo";
import ImageLinkForm from "./components/imageLinkForm/ImageLinkForm";
import Rank from "./components/rank/Rank";
import FaceRecognition from "./components/faceRecognition/FaceRecognition";
import Signin from "./components/signin/Signin";
import Register from "./components/register/Register";


const app = new Clarifai.App({
  apiKey: '262a90ad94db45c5aed573dfc429f3f8'
 });

class App extends Component {
  constructor(){
    super();
    this.state = {
      input: '',
      imageURL: '',
      box: {},
      route: 'signin',
      isSignedIn: false
    }
  }

  calculateFaceLocation = (data) =>{
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputImage');
    const width = Number(image.width);
    const height = Number(image.height);
    return{
      leftCol : clarifaiFace.left_col * width,
      topRow : clarifaiFace.top_row * height,
      rightCol : width - (clarifaiFace.right_col * width),
      bottomRow : height - (clarifaiFace.bottom_row * height)
    }
  }

  displayFaceBox = (box) =>{
    console.log(box);
    this.setState({box : box});
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  onButtonSubmit = () => {
    this.setState({imageURL : this.state.input})
    app.models.predict(
      Clarifai.FACE_DETECT_MODEL,
      this.state.input)
      .then(response => this.displayFaceBox(this.calculateFaceLocation(response)))
      .catch(err => console.log(err))
  }

  onRouteChange = (route) =>{
    if (route === "signout"){
      this.setState({isSignedIn: false})
    }else if(route === "home"){
      this.setState({isSignedIn: true})
    }
    this.setState({route: route});
    console.log(this.route);
    console.log(this.state.route);
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
      <Navigation  onRouteChange={this.onRouteChange} isSignedIn={this.state.isSignedIn}/>
      <Logo />
      { this.state.route === 'home' 
        ?
        <div>
        <Rank />
        <ImageLinkForm 
        onInputChange={this.onInputChange} 
        onButtonSubmit={this.onButtonSubmit}
        />
        <FaceRecognition 
          imageURL={this.state.imageURL}
          box={this.state.box}
        />
        </div>
        :
        (this.state.route === 'signin' 
        ?<Signin onRouteChange={this.onRouteChange} />
        :<Register onRouteChange={this.onRouteChange} />
         )
        
      }
    </div> 
  );
}
} 

export default App;
