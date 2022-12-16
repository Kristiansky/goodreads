import Header from './components/Header'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import SignIn from './pages/SignIn'
import MyBooks from './pages/MyBooks'
import Recommendations from './pages/Recommendations'
import ChoiceAwards from './pages/ChoiceAwards'
import NewReleases from './pages/NewReleases'
import Groups from './pages/Groups'
import Quotes from './pages/Quotes'
import People from './pages/People'
import SignUp from './pages/SignUp'
import ForgotPassword from './pages/ForgotPassword'

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/my-books" element={<MyBooks />} />
          <Route path="/recommendations" element={<Recommendations />} />
          <Route path="/choice-awards" element={<ChoiceAwards />} />
          <Route path="/new-releases" element={<NewReleases />} />
          <Route path="/groups" element={<Groups />} />
          <Route path="/quotes" element={<Quotes />} />
          <Route path="/people" element={<People />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />}/>
          <Route path="/forgot-password" element={<ForgotPassword />}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
