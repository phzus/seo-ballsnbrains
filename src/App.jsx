import { HashRouter, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import SpecialOffer from './pages/SpecialOffer';
import TestosteroneCoffee from './pages/TestosteroneCoffee';
import TestosteroneCoffeeBacklog from './pages/TestosteroneCoffeeBacklog';

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/testosterone-coffee" element={<TestosteroneCoffee />} />
        <Route path="/testosterone-coffee-backlog" element={<TestosteroneCoffeeBacklog />} />
        <Route path="/special-offer" element={<SpecialOffer />} />
      </Routes>
    </HashRouter>
  );
}
