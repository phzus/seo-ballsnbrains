import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import SpecialOffer from './pages/SpecialOffer';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/special-offer" element={<SpecialOffer />} />
      </Routes>
    </BrowserRouter>
  );
}
