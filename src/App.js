// import logo from './logo.svg';
import {Routes, Route} from 'react-router-dom';
import './App.css';
import User from './User'
// import 'leaflet/dist/leaflet.css'
import MapComponent from './Map'
 // eslint-disable-line import/no-webpack-loader-syntax



function App() {
  return (
    <div className="App">
    <Routes>
    <Route exact path="/" element={<User />} />
      <Route path='/users' element={<User />} />
      <Route path='/adduser' element={<User />} />
      <Route path='/showmap' element={<MapComponent />} />
    </Routes>
    </div>
  );
}

export default App;
