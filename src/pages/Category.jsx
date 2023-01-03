import { useState, useEffect } from 'react'
import { collection, getDocs, where, orderBy, query } from 'firebase/firestore'
import { db } from '../firebase'
import Spinner from '../components/Spinner'
import { useParams } from 'react-router-dom'
import BookItem from '../components/BookItem'

const Category = () => {
  const [books, setBooks] = useState(null)
  const [loading, setLoading] = useState(true)
  const params = useParams()
  
  useEffect(()=>{
    async function fetchBooks(){
      try{
        // get reference
        const bookRef = collection(db, "books")
        //create the query
        const q = query(bookRef, orderBy("timestamp", "desc"), where("genre", "==", params.categoryName))
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
  },[params.categoryName])
  
  if(loading){
    return <Spinner/>;
  }
  
  return (
    <>
      <section className="max-w-5xl mx-auto pt-[65px] pb-10">
        <h2>{params.categoryName}</h2>
        <div className="my-2 flex items-center before:flex-1 before:border-t before:border-gray-300">&nbsp;</div>
        {books && books.length > 0 && (
          <div className="grid grid-cols-6 gap-4">
            {books.map((book)=>(
              <BookItem id={book.id} key={book.id} book={book.data}/>
            ))}
          </div>
        )}
        {books.length === 0 && (
          <p>
            No books
          </p>
        )}
      </section>
    </>
  )
}

export default Category