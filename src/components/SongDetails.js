import React, { Component } from 'react';

class SongDetails extends Component {
    render() {
        var song = this.props.songs[this.props.params.id];

        console.log(this.props)
        return (
                <div key={song.id} className="jumbotron">
                <h4 className="card-header">{song.title}</h4>
                <div className="card-block">
                    <p className="card-text">{song.description}</p>
                    <audio controls autoPlay>
                        <source src={song.source} type="audio/ogg" />
                        Your browser does not support the audio tag.
                    </audio>
                    <br />
                </div>
            </div>
        )
    }
}

export default SongDetails;