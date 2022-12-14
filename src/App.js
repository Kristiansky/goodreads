import Header from './components/Header'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import SignIn from './pages/SignIn'

function App() {
  return (
    <>
      <Header />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/my-books" element={<SignIn />} />
          <Route path="/recommendations" element={<SignIn />} />
          <Route path="/choice-awards" element={<SignIn />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
