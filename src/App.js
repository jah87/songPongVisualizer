import React, { Component } from 'react';
import { Link } from 'react-router';
import SpotPlayer from './components/SpotPlayer';

class App extends Component {
  constructor() {
    super()
    this.state = {
      tOSTRTA: 0, //the One Song To Rule Them All
      songPlaying : false
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

  clickNext(){
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

  selectSong = (id)=> {
		this.setState({
      tOSTRTA: id,
      songPlaying: true
    })
    var audio = document.getElementById("audioPlayer");
    audio.play();
	}

  playPause = (value)=> {
    this.setState({
      songPlaying: value
    })
  }

  render() {
    const songs = this.props.route.songs
    return (
      <div className="App">
        <nav className="navbar navbar-toggleable-md bg-faded navbar-inverse bg-inverse">
          <Link className="navbar-brand" to="/"> Home</Link>
          <ul className="navbar-nav">

            <Link className="nav-link" to="/songs"> All Songs</Link>

          </ul>
        </nav>

        <div className="container spaceTop">
          
          {React.cloneElement(this.props.children, { songs }, { selectSong : this.selectSong})}

        </div>

        <SpotPlayer playPause={this.playPause} songPlaying={this.state.songPlaying} currentSong={songs[this.state.tOSTRTA]} clickPrev={this.clickPrev} clickNext={this.clickNext} />
        
      </div>

    );
  }
}

export default App;
