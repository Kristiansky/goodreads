import { useEffect, useState } from 'react'
import { collection, query, orderBy, limit, getDocs } from 'firebase/firestore'
import { db } from '../firebase'
import BookItem from '../components/BookItem'
import Spinner from '../components/Spinner'
import { Link } from 'react-router-dom'

const Home = (props) => {
  const [books, setBooks] = useState(null)
  const [loading, setLoading] = useState(true)
  
  useEffect(()=>{
    async function fetchBooks(){
      try{
        // get reference
        const bookRef = collection(db, "books")
        //create the query
        const q = query(bookRef, orderBy("timestamp", "desc"), limit(6))
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
    <>
      <section className="max-w-5xl mx-auto pt-[65px] pb-10">
        <h2>Latest added books</h2>
        <div className="my-2 flex items-center before:flex-1 before:border-t before:border-gray-300">&nbsp;</div>
          {books && books.length > 0 && (
            <div className="grid grid-cols-6 gap-4">
              {books.map((book)=>(
                <BookItem id={book.id} key={book.id} book={book.data}/>
              ))}
            </div>
          )}
        <div className="text-right">
          <Link to="/all-books">
            <p className="text-lg font-bold hover:underline text-[#382110]">See all books</p>
          </Link>
        </div>
      </section>
      <section className="py-10 w-full bg-[#f4f1ea] my-5">
        <div className="max-w-5xl mx-auto">
          <h2>All categories</h2>
          <div className="grid grid-cols-4 gap-4 mt-5">
            {props.categories.map((category)=>(
              <div key={category.id} className="bg-[#382110] p-2 rounded">
                <Link className="text-white font-semibold" to={`/category/${category.title}`}>{category.title}</Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

export default Home
