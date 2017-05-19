import React, { Component } from 'react';
import { Link } from 'react-router';
import SpotPlayer from './components/SpotPlayer';

var call;
class App extends Component {
  constructor() {
    super()
    this.state = {
      tOSTRTA: 0, //the One Song To Rule Them All
      songPlaying: false
    }

    this.clickNext = this.clickNext.bind(this)
  }

  clickPrev = () => {
    console.log(this.state.tOSTRTA)
    if (this.state.tOSTRTA === 0) {
      this.setState({
        tOSTRTA: this.props.route.songs.length - 1
      })
    }
    else if (this.state.tOSTRTA > 0) {
      this.setState({
        tOSTRTA: this.state.tOSTRTA - 1,
      })
    }
  }

  clickNext() {
    console.log(this.state.tOSTRTA)
    if (this.state.tOSTRTA === this.props.route.songs.length - 1) {
      this.setState({
        tOSTRTA: 0
      })
    }
    else if (this.state.tOSTRTA < this.props.route.songs.length) {
      this.setState({
        tOSTRTA: this.state.tOSTRTA + 1
      })
    }
  }

  selectSong = (id) => {
    this.setState({
      tOSTRTA: id,
      songPlaying: true
    })
    var audio = document.getElementById("audioPlayer");
    audio.play();

  }

  playPause = (value) => {
    this.setState({
      songPlaying: value
    })

    var canvas = document.getElementsByTagName("canvas")[0];
    var canvasContext = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight - (window.innerHeight * .08);

    var audioContext = new (window.AudioContext || window.webkitAudioContext)();
    var audio = document.getElementsByTagName("audio")[0];
    audio.crossOrigin = "anonymous";

    var source = audioContext.createMediaElementSource(audio);
    var analyser = audioContext.createAnalyser();

    source.connect(analyser);
    analyser.connect(audioContext.destination);

    var bufferLength = analyser.frequencyBinCount;
    var frequencyData = new Uint8Array(bufferLength);

    function visualizeRender() {
      canvasContext.clearRect(0, 0, canvas.width, canvas.height);
      analyser.getByteFrequencyData(frequencyData);

      var frequencyWidth = canvas.width / bufferLength, frequencyHeight = 0, x = 0;

      for (var increment = 0; increment < bufferLength; increment++) {
        frequencyHeight = frequencyData[increment] * (canvas.height * 0.00345678);
        canvasContext.fillStyle = "rgb(" + (Math.ceil((Math.floor(Math.random() * 256) * 150))) + ", " + (Math.floor(Math.random() * 100)) + " , " + 0 + ")";
        canvasContext.fillRect(
          x,
          canvas.height - frequencyHeight,
          frequencyWidth,
          frequencyHeight
        );
        x += frequencyWidth + 4;
      }

      call = requestAnimationFrame(visualizeRender);
    }
    if (value) {
      audio.play();
      visualizeRender();
    } else {
      audio.pause();
      cancelAnimationFrame(call);
    }
    window.addEventListener("resize", function() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight - (window.innerHeight * .08);
    });
  }

  render() {
    const songs = this.props.route.songs
    return (
      <div className="App">
      <canvas></canvas>
        <nav className="navbar navbar-toggleable-md bg-faded navbar-inverse bg-inverse">
          <Link className="navbar-brand" to="/"> Home</Link>
          <ul className="navbar-nav">

            <Link className="nav-link" to="/songs"> All Songs</Link>

          </ul>
        </nav>

        <div className="container-fluid spaceTop">
          
          {React.cloneElement(this.props.children, { songs }, { selectSong: this.selectSong })}

        </div>

        <SpotPlayer playPause={this.playPause} songPlaying={this.state.songPlaying} currentSong={songs[this.state.tOSTRTA]} clickPrev={this.clickPrev} clickNext={this.clickNext} />

      </div>

    );
  }
}

export default App;
