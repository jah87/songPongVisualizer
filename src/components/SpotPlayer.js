import React, { Component } from 'react';

class SpotPlayer extends Component {

    clickPrev = ()=> {
		this.props.clickPrev();
	}

    clickNext = ()=> {
		this.props.clickNext();
	}
    
    songPlayState = (value) => {
        this.props.playPause(value)
    }

    render() {
        var song = this.props.currentSong;

        return (
            <div className="fixed-bottom navbar-inverse bg-inverse">

                <h5 className="whiteText text-center spaceTop"><i>Current Song:</i> <b>{song.title}</b></h5>
                <div className="text-center flex-box spaceBot">
                
                <img src="/icons/icon_arrow_left.svg" onClick={()=>{this.clickPrev()}} className="arrowMargins" ></img>
                    <audio src={song.source} autoPlay={this.props.songPlaying === false ? false : true}  
                    controls onPause={()=>{this.songPlayState(false)}} 
                    onPlay={()=>{this.songPlayState(true)}} id="audioPlayer">
                        Your browser does not support the audio tag.
                    </audio>
                <img src="/icons/icon_arrow_right.svg" onClick={()=>{this.clickNext()}} className="arrowMargins" />
                </div>
                
            </div>
        )
    }
}

export default SpotPlayer;