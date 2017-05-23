import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';
import App from './App';
import SongsList from './components/SongsList';
import SongDetails from './components/SongDetails';
import './index.css';
import '../public/css/mystyles.css';
import '../public/css/bootstrap.min.css';

function Song(source, title, description, id) {
  this.source = source;
  this.title = title;
  this.description = description;
  this.id = id;
}

const songs = [
  new Song('/upstep.mp3', 'Upstep', 'Brutal beat and bulky bass are the foundation for a dubstep frenzy featuring synths, wailing guitar and jitters and glitches. Tempo: 140bpm', 0),
  new Song('/Ignite.mp3', 'Ignite', '“Ignite” is a collaboration between the award winning EDM artist Zedd and Riot Games', 1),
  new Song('/Daft_Punk.mp3', 'Robot Rock', 'Daft Punk - Energetic electronic melody featuring modern drums, snaking bass and explosive electric guitar. Tempo: 120bpm', 2),
  new Song('/Casiokids.mp3', 'Casiokids', 'Fot i hose', 3),
  new Song('/Ecstasy.mp3', 'Ecstasy', 'Ecstasy', 4)
]

ReactDOM.render((
  <Router history={browserHistory}>
    <Route songs={songs} path="/" component={App}>

      <IndexRoute component={SongsList} />
      <Route path="songs" component={SongsList} />
      <Route path="songs/:id" component={SongDetails} /> 

    </Route>
  </Router>
),document.getElementById('root'));
