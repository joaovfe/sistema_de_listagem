// cSpell: disable
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Home() {
    const [people, setPeople] = useState([]);
    const [nextPage, setNextPage] = useState('https://swapi.py4e.com/api/people/');
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredPeople, setFilteredPeople] = useState([]);

    useEffect(() => {
        if (nextPage) {
            fetchData();
        }
    }, [nextPage]);

    const fetchData = async () => {
        try {
            const response = await fetch(nextPage);
            const data = await response.json();

            setPeople(prevPeople => [...prevPeople, ...data.results]);

            setNextPage(data.next);
        } catch (error) {
            console.error(error);
        }
    };

    const handleSearchChange = (event) => {
        const pesquisa = event.target.value.toLowerCase();

        setFilteredPeople(
            people.filter((person) => person.name.toLowerCase().includes(pesquisa))
        );

        people.forEach(p => p['id'] = p.url.split('/')[5]);

        setSearchTerm(pesquisa)
    };

    return (
        <div>
            <input id="buscar-personagem" type="text" placeholder="Buscar personagem..." onChange={handleSearchChange} />
            {filteredPeople.length > 0 ? (
                <ul className="characters-list">
                    {filteredPeople.map((result) => (
                        <Link key={result.id} to={`/pessoas/${result.id}`}>
                            {result.name}
                        </Link>
                    ))}
                </ul>
            ) : (
                <div>
                    {/* <h2>Não encontrei nada com o termo "{searchTerm}"</h2> */}
                </div>
            )
            }
        </div >
    );
}

export default Home;