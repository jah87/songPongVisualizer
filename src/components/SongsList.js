import React, { Component } from 'react';
import { Link } from 'react-router';

class SongsList extends Component {
    playSong = (songId) => {
        this.props.children.selectSong(songId); // calling selectSong function from props passed through children in CloneElement from App
    }

    render() {
        var songs = this.props.songs;
        var eachSong = songs.map(song =>
            <div key={song.id} className="card song-Card">
                <h4 className="card-header">{song.title}</h4>
                <div className="card-block bg-inverse">
                        <button onClick={() => { this.playSong(song.id) }} className="btn btn-secondary">Play</button>
                </div>
            </div>
        )

        return (
            <div className="row centered" id="hide-cards-mobile">
                {eachSong}
            </div>
        )
    }
}

export default SongsList;