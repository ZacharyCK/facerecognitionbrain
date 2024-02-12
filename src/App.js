import React, {Component} from "react";
import "./App.css";
import Navigation from "./components/navigation/Navigation";
import Logo from "./components/logo/Logo";
import ImageLinkForm from "./components/imagelinkform/ImageLinkForm";
import Rank from "./components/rank/Rank";
import ParticlesBg from "particles-bg";
import FaceRecognition from "./components/facerecognition/FaceRecognition";
import "tachyons";
import SignIn from "./components/signin/SignIn";
import Register from "./components/register/Register"

const initialState = {
  input: '',
  imageURL: '',
  boxes: [],
  route: 'signin',
  isSignedIn: 'false',
  user: {
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: ''
  }
}
class App extends Component {
  constructor() {
    super();
    this.state = initialState;
  }

  loadUser = (data) => {
    this.setState({
      user: {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined
      }
    })
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value})
  }

  calculateFaceLocation = (top, left, bottom, right) => {
    const img = document.getElementById('inputImage')
    const width = Number(img.width)
    const height = Number(img.height)
    return {
      leftCol: left * width,
      topRow: top * height,
      rightCol: width - (right * width),
      bottomRow: height - (bottom * height)
    }
  }

  displayFaceBox = (boxInput) => {
    this.setState((prevState) => ({
      boxes: [...prevState.boxes, boxInput]
    }));
  }

  onSubmit = () => {
    // Setting the state of the imageURL once button clicked
    this.setState({imageURL: this.state.input})
    // resetting state of boxes for faces to an empty array
    this.setState({boxes: []})
    
    // Setting the IMAGE_URL to the input to be able to send to 
    // the server to calculate where the faces are in the image
    const IMAGE_URL = this.state.input;

    fetch('https://mysmartbrainbackend.onrender.com/image', {
      method: 'put',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: this.state.user.id,
        image: IMAGE_URL
      })
    })
    .then(response => response.json())
    .then(data => {
      const {entries, regions} = data
      console.log(entries, regions)
      this.setState(Object.assign(this.state.user, {entries: entries}))
      regions.forEach(region => {
        // Accessing and rounding the bounding box values
        const boundingBox = region.region_info.bounding_box;
        const topRow = boundingBox.top_row.toFixed(3);
        const leftCol = boundingBox.left_col.toFixed(3);
        const bottomRow = boundingBox.bottom_row.toFixed(3);
        const rightCol = boundingBox.right_col.toFixed(3);

        region.data.concepts.forEach(concept => {
            // Accessing and rounding the concept value
            const name = concept.name;
            const value = concept.value.toFixed(4);
            this.displayFaceBox(this.calculateFaceLocation(topRow, leftCol, bottomRow, rightCol))
            console.log(`${name}: ${value} BBox: ${topRow}, ${leftCol}, ${bottomRow}, ${rightCol}`);
        });
      });
    })
    .catch(err => {
      console.log("Uh Oh! There was an error!", err)
    })
  }

  onRouteChange = (route) => {
    if(route === 'signin') {
      this.setState(initialState)
    } else if (route === 'home') {
      this.setState({isSignedIn: 'true'})
    } else {
      this.setState({isSignedIn: 'false'})
    }
    this.setState({route: route})
  }

  render() {
    console.log(this.state.box)
    return (
      <div className="App">
        <ParticlesBg
          className="particles"
          color="#ffffff"
          type="cobweb"
          num={100}
          bg={true}
        />
        <Navigation onRouteChange={this.onRouteChange} isSignedIn={this.state.isSignedIn} />
        { this.state.route === 'home' ? 
          <>
            <Logo />
            <Rank userName={this.state.user.name} userEntries={this.state.user.entries}/>
            <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onSubmit} />
            <FaceRecognition boxes={this.state.boxes} imageURL={this.state.imageURL} /> 
          </> : (this.state.route === 'signin' ? 
                  <SignIn onRouteChange={this.onRouteChange} loadUser={this.loadUser} /> :
                  <Register onRouteChange={this.onRouteChange} loadUser={this.loadUser} />
                )
          
        }
      </div>
    );
  }
}  



export default App;
