/* cSpell: disable */
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { Link } from 'react-router-dom/dist';
import CharacterDetails from './components/CharacterDetails';
import Hero from "./components/Hero";
import Rebelde from "./components/Rebelde";
import Home from './Home';
import './index.css';

function App() {
  return (
    <div>

      <nav>
        <Link to="/"><h3>Home</h3></Link>
        <Rebelde />
      </nav>
      <main>
        <Hero />
        <h1 id='subtitle'>UTILIZE A FORÇA PARA PESQUISAR <br />SEU PERSONAGEM FAVORITO</h1>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pessoas/:numero" element={<CharacterDetails />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;