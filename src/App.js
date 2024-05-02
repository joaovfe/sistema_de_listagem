/* cSpell: disable */
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CharacterDetails from './components/CharacterDetails';
import Home from './Home';
import index from './index.css'

function App() {
  return (
    <Router>
      <main>
        <h1>Busque seu personagem</h1>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pessoas/:numero" element={<CharacterDetails />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;


