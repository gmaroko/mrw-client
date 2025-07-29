import React, {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import ReactPlayer from 'react-player'
import './Trailer.css'
import api from "../../api/apiConfig.js";

const Trailer = () => {
    const { movieId } = useParams();
    let trailerLink = "";
    const [link, setLink] = useState(trailerLink);

    const getTrailer = async () => {
        const response =  await api.get(`/movies/trailer/${movieId}`);
        if (response.status === 200) {
            trailerLink = response.data.data.site;
            setLink(trailerLink);
        }
        return response;
    }

    useEffect(() => {
        getTrailer().then(r => {
            trailerLink = r.data.data.site;
            setLink(trailerLink);
        });
    }, [link]);


    return (
        <div className='react-player-container'>
            <ReactPlayer controls={true} autoPlay={true} playing={true} url={`${link}`} width='100%' height='100%' />
        </div>
    )
}

export default Trailer