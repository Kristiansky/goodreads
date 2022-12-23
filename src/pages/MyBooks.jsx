import { useState, useEffect } from 'react'
import useAuthStatus from '../Hooks/useAuthStatus'
import Spinner from '../components/Spinner'
import { collection, getDocs, limit, orderBy, query } from 'firebase/firestore'
import { db } from '../firebase'

const MyBooks = () => {
  const [books, setBooks] = useState(null)
  const [loading, setLoading] = useState(true)
  const {loggedIn, checkingStatus} = useAuthStatus()
  
  useEffect(()=>{
    if(loggedIn){
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
    }
  },[loggedIn])
  
  if(loading || checkingStatus){
    return <Spinner/>;
  }
  
  return (loggedIn &&
      <>
      </>
  )

}
export default MyBooks
