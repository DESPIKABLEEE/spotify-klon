import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Home.jsx';
import Trending from './components/Trending.jsx';
import TrendingSection from './components/TrendingSection.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route index element={<Trending />} />
          <Route path="section/:sectionId" element={<TrendingSection />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
