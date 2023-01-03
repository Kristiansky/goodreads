import { useState, useEffect } from 'react'
import useAuthStatus from '../Hooks/useAuthStatus'
import Spinner from '../components/Spinner'
import { collection, getDocs, limit, orderBy, query, where, documentId } from 'firebase/firestore'
import { db } from '../firebase'
import BookItem from '../components/BookItem'
import { getAuth } from 'firebase/auth'

const MyBooks = () => {
  const [books, setBooks] = useState(null)
  const [loading, setLoading] = useState(true)
  const {loggedIn, checkingStatus} = useAuthStatus()
  const auth = getAuth()
  
  useEffect(()=>{
    if(loggedIn){
      async function fetchBooks(){
        try{
          const favBooks = collection(db, "favBooks")
          const qFavBooks = query(favBooks, where("uid", "==", auth.currentUser.uid))
          const docSnapFavBooks = await getDocs(qFavBooks)
          let favIds = [];
          docSnapFavBooks.forEach((doc)=>{
            favIds.push(doc.data().bookId)
          })
          const bookRef = collection(db, "books")
          const q = query(bookRef, where(documentId(), "in", favIds))
          const docSnap = await getDocs(q)
          const books = [];
          docSnap.forEach((doc)=>{
            return books.push({
              id: doc.id,
              data: doc.data()
            })
          })
          setBooks(books)
          setLoading(false)
        }catch (e){
          console.log(e)
        }
      }
      fetchBooks()
    }
  },[loggedIn])
  
  if(loading || checkingStatus){
    return <Spinner/>;
  }
  
  return (loggedIn &&
    <section className="max-w-5xl mx-auto pt-[65px]">
      <h1>My favourite books</h1>
      <div className="my-2 flex items-center before:flex-1 before:border-t before:border-gray-300">&nbsp;</div>
      {books && books.length > 0 && (
        <div className="grid grid-cols-6 gap-4">
          {books.map((book)=>(
            <BookItem id={book.id} key={book.id} book={book.data}/>
          ))}
        </div>
      )}
    </section>
  )

}
export default MyBooks
