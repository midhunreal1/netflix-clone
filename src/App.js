import React from 'react';
import logo from './logo.svg';
import './App.css';
import {originals,action,romance, comedy, horror, documentaries} from './urls'
import Navbar from './Components/NavBar/Navbar';
import Banner from './Components/Banner/Banner';
import RowPost from './Components/RowPost/RowPost';



function App() {
  return (
    <div className="App">
      <Navbar/>
      <Banner/>
      <RowPost title='Netflix Originals' url={originals}/>
      <RowPost title='Action Movies' isSmall url={action}/>
      <RowPost title='Romance Movies' isSmall url={romance}/>
      <RowPost title='Comedy Movies' isSmall url={comedy}/>
      <RowPost title='Horror Movies' isSmall url={horror}/>
      <RowPost title='Documentaries' isSmall url={documentaries}/>
    </div>
  );
}

export default App;
