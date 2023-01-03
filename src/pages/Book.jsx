import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import { addDoc, collection, doc, getDoc, getDocs, query, where, deleteDoc } from 'firebase/firestore'
import { db } from '../firebase'
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai'
import Spinner from '../components/Spinner'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { toast } from 'react-toastify'

const Book = () => {
  const params = useParams()
  const [book, setBook] = useState(null)
  const [loading, setLoading] = useState(true)
  const [isFav, setIsFav] = useState(false)
  const [loggedIn, setLoggedIn] = useState(false)
  const [checkingStatus, setCheckingStatus] = useState(true)
  const auth = getAuth()
  
  useEffect(() => {
    async function fetchBook(){
      const docRef = doc(db, "books", params.bookId)
      const docSnap = await getDoc(docRef)
      if(docSnap.exists()){
        setBook(docSnap.data())
        setLoading(false)
      }
    }
    fetchBook()
  }, [params.bookId])
  
  useEffect(()=>{
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        setLoggedIn(true)
        try {
          const favBooks = collection(db, "favBooks")
          const q = query(favBooks, where('uid', "==", user.uid), where('bookId', '==', params.bookId))
          const querySnap = await getDocs(q)
          if(querySnap.docs.length){
            setIsFav(true)
          }else{
            setIsFav(false)
          }
        } catch (e) {
          toast.error(e.message)
          setIsFav(false)
        }
      }
      setCheckingStatus(false)
    })
  }, [params.bookId])
  
  if(loading || checkingStatus){
    return <Spinner/>;
  }
  
  async function favBook (bookId) {
    if (loggedIn) {
      if(!isFav){
        try{
          const docRef = await addDoc(collection(db, "favBooks"), {
            uid: auth.currentUser.uid,
            bookId: params.bookId
          })
          setIsFav(true)
          toast.success("Successfully added in favourites.")
        }catch (e) {
          toast.error(e.message)
        }
      }else{
        if(window.confirm("Are you sure to remove from favourites?")){
          const favBooks = collection(db, "favBooks")
          const q = query(favBooks, where('uid', "==", auth.currentUser.uid), where('bookId', '==', params.bookId))
          const querySnap = await getDocs(q)
          await deleteDoc(querySnap.docs[0].ref.withConverter())
          setIsFav(false)
          toast.success("Successfully removed from favourites.")
        }
      }
    } else {
      console.log('Please login')
    }
  }
  
  return (
    <section className="max-w-5xl mx-auto pt-[65px]">
      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-1">
          <div className="w-100 relative">
            <img src={book.imgUrls[0]} alt={book.name} className="w-100 rounded-r-lg"/>
            <div className="absolute bottom-2 right-2 shadow-lg rounded-full border-[2px] p-1 bg-white cursor-pointer" onClick={()=>favBook(book.id)}>
              { isFav ? <AiFillHeart /> : <AiOutlineHeart />}
            </div>
          </div>
        </div>
        <div className="col-span-2">
          <h1 className="font-bold">{book.name}</h1>
          <h2 className="font-thin">{book.author}</h2>
          <h3 className="font-thin italic">{book.genre}</h3>
          <div className="flex items-center before:flex-1 before:border-t before:border-gray-300">&nbsp;</div>
          <p>
            {book.description}
          </p>
        </div>
      </div>
    </section>
  )
}

export default Book