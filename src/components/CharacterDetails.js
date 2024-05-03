/* cSpell: disable */
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

function CharacterDetails() {
    const { numero } = useParams(); // useParams -> pega o número da rota ex: /pessoas/5 -> 5
    const [characterInfo, setCharacterInfo] = useState({});
    const [filmDetails, setFilmDetails] = useState([]);

    const fetchCharacterInfo = async () => {
        try {
            const response = await fetch(`https://swapi.py4e.com/api/people/${numero}`);
            const data = await response.json();
            setCharacterInfo(data);
        } catch (error) {
            console.error(error);
        }
    };

    const fetchFilmDetails = async (filmUrl) => {
        try {
            const response = await fetch(filmUrl);
            const filmData = await response.json();
            return { title: filmData.title, releaseDate: filmData.release_date };
        } catch (error) {
            console.error(error);
            return null;
        }
    };

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

    return (
        <div className="container-result">
            <p>Nome: {characterInfo.name}</p>
            <p>Gênero: {characterInfo.gender}</p>
            <p>Ano de nascimento: {characterInfo.birth_year}</p>
            <p>Cor dos olhos: {characterInfo.eye_color}</p>
            <p>Filmes</p>
            {filmDetails.length > 0 && (
                <ul>
                    {filmDetails.map((film) => (
                        <li key={film.title}>
                            {film.title} - {film.releaseDate}
                        </li>
                    ))}
                </ul>
            )}
            <Link to="/">Vortar</Link>
        </div>
    );
}

export default CharacterDetails;