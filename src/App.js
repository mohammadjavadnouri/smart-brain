import React, {Component} from 'react';
import Particles from 'react-particles-js';
import './App.css';
import Navigation from "./components/navigation/Navigation"
import Logo from "./components/logo/logo";
import ImageLinkForm from "./components/imageLinkForm/ImageLinkForm"

class App extends Component {
  render(){
  return (
    <div className="App">
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
      <Navigation />
       <Logo />
      <ImageLinkForm />
      { /*
      <FaceRecognition /> */}
    </div> 
  );
}
} 

export default App;
