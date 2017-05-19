import React, { Component } from 'react';
// import masterVisualizer from '../public/js/Visualizer.js'

class SpotPlayer extends Component {

    clickPrev = ()=> {
		this.props.clickPrev();
	}

    clickNext = ()=> {
		this.props.clickNext();
	}
    
    songPlayState = (value) => {
        this.props.playPause(value)
        // masterVisualizer.visualizeRender()
    }

    render() {
        var song = this.props.currentSong;
        // console.log('spotty')
        // console.log(this.props)
        // console.log('just inside the spot player')

        return (
            <div className="fixed-bottom navbar-inverse bg-inverse">

                <h5 className="whiteText text-center spaceTop"><i>Current Song:</i> <b>{song.title}</b></h5>
                <div className="text-center flex-box spaceBot">
                
                <div onClick={()=>{this.clickPrev()}} className="carousel-control-prev-icon arrowMargins" ></div>
                    <audio src={song.source} autoPlay={this.props.songPlaying === false ? false : true}  
                    controls onPause={()=>{this.songPlayState(false)}} 
                    onPlay={()=>{this.songPlayState(true)}} id="audioPlayer">
                        
                        Your browser does not support the audio tag.
                    </audio>
                <div onClick={()=>{this.clickNext()}} className="carousel-control-next-icon arrowMargins" ></div>
                </div>
                
            </div>
        )
    }
}

export default SpotPlayer;