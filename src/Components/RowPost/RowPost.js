import React, { useEffect, useState } from 'react'
import './RowPost.css'
import axios from '../../axios'
import { API_KEY, imageUrl } from '../../constants/constants'
import YouTube from 'react-youtube'

function RowPost(props) {
    const [movies,setMovies] =useState([])
    const [urlId,setUrlId] = useState('')
    useEffect(()=>{
        axios.get(props.url).then(res=>{
            console.log(res.data)
            setMovies(res.data.results)
        })
    },[])
    const opts = {
        height: '390',
        width: '100%',
        playerVars: {
          autoplay: 1,
        },
      };
  const handleMovie =(id)=>{
    axios.get(`/movie/${id}/videos?api_key=${API_KEY}&language=en-US`).then((res)=>{
    if(res.data.results.length!==0){
        setUrlId(res.data.id)
    }
  })
  }
  return (
    <div className='row'>
        <h2>{props.title}</h2>
        <div className='posters'>
            {movies.map((movie)=>
          <img onClick={()=>{handleMovie(movie.id)}} className={props.isSmall?"smallPoster":"poster"}  src={`${imageUrl+movie.backdrop_path}`} alt='poster'/>
            )}
       </div>
      {urlId &&<YouTube
       videoId={urlId.key}
       opts={opts}
       />} 
    </div>
  )
}

export default RowPost