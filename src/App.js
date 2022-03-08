import React, {useEffect, useState} from 'react';
import Tmdb from './Tmdb';

import MovieRow from './components/MovieRow';
import FeatureMovie from './components/FeatureMovie';
import Header from './components/Header';

import './App.css'

export default ()=>{

    const [movieList, setMovieList] = useState([]);
    const [featureData, setFeatureData] = useState(null);
    const [blackHeader, setBlackHeader] = useState(false);

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

    useEffect(()=>{
        const scrollListener = () =>{
            if(window.scrollY > 10){
                setBlackHeader(true);
            } else { setBlackHeader(false);}
        }
        window.addEventListener('scroll', scrollListener);
        return ()=>{
            window.removeEventListener('scroll', scrollListener);
        }
    }, [])

    return(
        <div className="pages">

            <Header black={blackHeader}/>

            {
            featureData && 
            <FeatureMovie item={featureData} />
            }
            

            <section className="lists">
                {movieList.map((item, key)=>(
                <MovieRow key={key} title={item.title} items={item.items}/>
            ))}
            </section>

            <footer>
                Desenvolvido por Mariana X Magalhaes.<br/>
                Direitos de imagem para Netflix, HBO, Amaxon Prime Video.<br/>
                API do site Themoviedb.org.
            </footer>
            
            {movieList.length <=0 &&
            <div className="loading">
                <img src="https://media.filmelier.com/noticias/br/2020/03/Netflix_LoadTime.gif" alt="Carregando"/>
            </div>
            }
        </div>
    );
}

