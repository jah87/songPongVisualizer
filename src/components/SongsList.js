import React, { Component } from 'react';
import { Link } from 'react-router';

class SongsList extends Component {
    playSong = (songId) => {
        this.props.children.selectSong(songId); // this.props.children.routes.clones.wars.items
    }


    render() {
        console.log('inside songlist')
        console.log(this.props)
        console.log('inside songlist')
        var songs = this.props.songs;
        var eachSong = songs.map(song =>
            <div key={song.id} className="card song-Card">
                <h4 className="card-header">{song.title}</h4>
                <div className="card-block">
                    <div className="container row">
                        <button onClick={() => { this.playSong(song.id) }} className="btn btn-secondary">Play</button>
                        <Link className="nav-link" to={`/songs/${song.id}`}>
                            <button className="btn btn-primary">
                                View Details
                            </button>
                        </Link>
                    </div>

                </div>
            </div>
        )

        console.log(this.props)
        return (
            <div className="row">
                {eachSong}
            </div>
        )
    }
}

export default SongsList;