import React, {useEffect, useState} from 'react';
import Tmdb from './Tmdb';

import MovieRow from './components/MovieRow';
import FeatureMovie from './components/FeatureMovie';

import './App.css'

export default ()=>{

    const [movieList, setMovieList] = useState([]);
    const [featureData, setFeatureData] = useState(null);

    useEffect(()=>{
        const loadAll = async () => {
            // carregando lista
            let list = await Tmdb.getHomeList();
            setMovieList(list);

            // carregando filme em destaque
            let originals = list.filter(i=>i.slug === "originals");
            // pegar um original aleatorio
            let randomChosen = Math.floor(Math.random()*(originals[0].items.results.length-1));
            let chosen = originals[0].items.results[randomChosen];
            // console.log(chosen);
            let chosenInfo = await Tmdb.getMovieInfo(chosen.id, 'tv');
            // console.log(chosenInfo);
            setFeatureData(chosenInfo);
        }

        loadAll();
    }, []);

    return(
        <div className="pages">

            {
            featureData && 
            <FeatureMovie item={featureData} />
            }
            

            <section className="lists">
                {movieList.map((item, key)=>(
                <MovieRow key={key} title={item.title} items={item.items}/>
            ))}
            </section>
        </div>
    );
}

