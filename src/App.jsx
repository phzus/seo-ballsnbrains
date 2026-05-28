import { HashRouter, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import SpecialOffer from './pages/SpecialOffer';
import TestosteroneCoffee from './pages/TestosteroneCoffee';

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/testosterone-coffee" element={<TestosteroneCoffee />} />
        <Route path="/special-offer" element={<SpecialOffer />} />
      </Routes>
    </HashRouter>
  );
}
