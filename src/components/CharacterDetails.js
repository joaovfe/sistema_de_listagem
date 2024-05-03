/* cSpell: disable */
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function CharacterDetails() {
    const { numero } = useParams(); // useParams -> pega o número da rota ex: /pessoas/5 -> 5
    const [characterInfo, setCharacterInfo] = useState({}); //useState -> declara uma variável "state"
    const [filmDetails, setFilmDetails] = useState([]);

    const fetchCharacterInfo = async () => {
        try {
            const response = await fetch(`https://swapi.py4e.com/api/people/${numero}`);
            const data = await response.json();
            setCharacterInfo(data);
        } catch (error) {
            console.error(error);
        }
    }; //puxa informações dos personagens

    const fetchFilmDetails = async (filmUrl) => {
        try {
            const response = await fetch(filmUrl);
            const filmData = await response.json();
            return { title: filmData.title, releaseDate: filmData.release_date };
        } catch (error) {
            console.error(error);
            return null;
        }
    }; //puxa informações dos filmes

    useEffect(() => {
        fetchCharacterInfo();
    }, [numero]);

    useEffect(() => {
        if (characterInfo.films) {
            const filmPromises = characterInfo.films.map(async (filmUrl) => await fetchFilmDetails(filmUrl));
            Promise.all(filmPromises)
                .then((filmData) => setFilmDetails(filmData.filter(detail => detail)));
        }
    }, [characterInfo]);

    //atualiza informações dos filmes

    return (
        <div className="container-result">
            <p>Nome: <span style={{ "fontWeight": "600", "fontFamily": "Inter, sans-serif", "color": "#000" }}>{characterInfo.name}</span></p>
            <p>Gênero: <span style={{ "fontWeight": "600", "fontFamily": "Inter, sans-serif", "color": "#000" }}>
                {characterInfo.gender === "male" ? (
                    "Masculino"
                ) : (
                    "Feminino"
                )}
            </span>
            </p>
            <p>Ano de nascimento: <span style={{ "fontWeight": "600", "fontFamily": "Inter, sans-serif", "color": "#000" }}>{characterInfo.birth_year}</span></p>
            <p>Cor dos olhos: <span style={{ "fontWeight": "600", "fontFamily": "Inter, sans-serif", "color": "#000" }}>{characterInfo.eye_color}</span></p>
            <div className='filmes'>
                <p>Filmes: </p>
                {filmDetails.length > 0 && (
                    <ul>
                        {filmDetails.map((film) => (
                            <li key={film.title}>
                                {film.title} <span style={{ "fontStyle": "italic" }}>{film.releaseDate}</span>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}

//informações dentro do cartão


export default CharacterDetails;