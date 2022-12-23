import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../firebase'
import { AiOutlineHeart } from 'react-icons/ai'
import Spinner from '../components/Spinner'

const Book = () => {
  const params = useParams()
  const [book, setBook] = useState(null)
  const [loading, setLoading] = useState(true)
  const [isFav, setIsFav] = useState(false)
  
  useEffect(() => {
    async function fetchBook(){
      const docRef = doc(db, "books", params.bookId)
      const docSnap = await getDoc(docRef)
      if(docSnap.exists()){
        console.log(docSnap.data())
        setBook(docSnap.data())
        setLoading(false)
      }
    }
    fetchBook()
  }, [params.bookId])
  
  if(loading){
    return <Spinner/>;
  }
  
  return (
    <section className="max-w-5xl mx-auto pt-[65px]">
      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-1">
          <div className="w-100 relative">
            <img src={book.imgUrls[0]} alt={book.name} className="w-100 rounded-r-lg"/>
            <div className="absolute bottom-2 right-2 shadow-lg rounded-full border-[2px] p-1 bg-white">
              <AiOutlineHeart />
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