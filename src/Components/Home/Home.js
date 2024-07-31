import React from 'react';
import {originals,action,romance, comedy, horror, documentaries} from '../../urls'
import Navbar from '../NavBar/Navbar';
import RowPost from '../RowPost/RowPost';
import Banner from '../Banner/Banner'


function Home() {
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

export default Home;
