import { useEffect, useState } from 'react'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../firebase'

const useIsAdmin = () => {
  const [isAdmin, setIsAdmin] = useState(false)
  const [checkingStatus, setCheckingStatus] = useState(true)
  
  useEffect(()=>{
    const auth = getAuth()
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const docRef = doc(db, "users", user.uid)
        const docSnap = await getDoc(docRef)
        if(docSnap.exists() && docSnap.data().accountType === "admin"){
          setIsAdmin(true)
        }
      }
      setCheckingStatus(false)
    })
  }, [])
  
  return {isAdmin, checkingStatus}
}

export default useIsAdmin
