import { useEffect, useState } from 'react'
import { collection, query, orderBy, limit, getDocs } from 'firebase/firestore'
import { db } from '../firebase'
import BookItem from '../components/BookItem'
import Spinner from '../components/Spinner'

const Home = () => {
  const [books, setBooks] = useState(null)
  const [loading, setLoading] = useState(true)
  
  useEffect(()=>{
    async function fetchBooks(){
      try{
        // get reference
        const bookRef = collection(db, "books")
        //create the query
        const q = query(bookRef, orderBy("timestamp", "desc"), limit(9))
        // execute the query
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
  },[])
  
  if(loading){
    return <Spinner/>;
  }
  
  return (
    <section className="max-w-5xl mx-auto pt-[65px]">
      <h1>Home</h1>
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

export default Home
