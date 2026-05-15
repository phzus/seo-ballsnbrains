import { HashRouter, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import SpecialOffer from './pages/SpecialOffer';

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/special-offer" element={<SpecialOffer />} />
      </Routes>
    </HashRouter>
  );
}
