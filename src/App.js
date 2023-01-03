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
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import Profile from './pages/Profile'
import PrivateRoute from './components/PrivateRoute'
import AddBook from './pages/AddBook'
import PrivateRouteAdmin from './components/PrivateRouteAdmin'
import Book from './pages/Book'
import { collection, getDocs, query } from 'firebase/firestore'
import { db } from './firebase'
import { useEffect, useState } from 'react'
import Spinner from './components/Spinner'
import Category from './pages/Category'

function App() {
  
  const [categories, setCategories] = useState(null)
  const [loading, setLoading] = useState(true)
  
  useEffect(()=>{
    async function fetchCategories(){
      try{
        const catsRef = collection(db, "categories")
        const q = query(catsRef)
        const docSnap = await getDocs(q)
        const categories = [];
        docSnap.forEach((doc)=>{
          return categories.push({
            id: doc.id,
            title: doc.data().title
          })
        })
        setCategories(categories)
        setLoading(false)
      }catch (e){
        console.log(e)
      }
    }
    fetchCategories()
  },[])
  
  if(loading){
    return <Spinner/>;
  }
  
  return (
    <>
      <BrowserRouter>
        <Header categories={categories}/>
        <Routes>
          <Route path="/" element={<Home categories={categories}/>} />
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
          <Route path="/profile" element={<PrivateRoute />}>
            <Route path="/profile" element={<Profile />}/>
          </Route>
          <Route path="/add-book" element={<PrivateRouteAdmin />}>
            <Route path="/add-book" element={<AddBook categories={categories}/>}/>
          </Route>
          <Route path="/category/:categoryName" element={<Category />}/>
          <Route path="/book/:bookId" element={<Book />}/>
        </Routes>
      </BrowserRouter>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </>
  );
}

export default App;
