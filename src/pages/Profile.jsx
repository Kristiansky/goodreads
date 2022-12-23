import { useState } from 'react'
import { getAuth, updateProfile } from 'firebase/auth'
import { toast } from 'react-toastify'
import { db } from '../firebase'
import { doc, updateDoc } from 'firebase/firestore'
import useIsAdmin from '../Hooks/useIsAdmin'

const Profile = () => {
  const auth = getAuth()
  const {isAdmin} = useIsAdmin()
  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email
  })
  
  function changeField(e){
    setFormData((prevState => ({
      ...prevState,
      [e.target.id]: e.target.value
    })))
  }
  
  async function submitForm(event){
    event.preventDefault()
    try{
      if(auth.currentUser.displayName !== formData.name){
        await updateProfile(auth.currentUser, {
          displayName: formData.name
        })
        
        const docRef = doc(db, "users", auth.currentUser.uid)
        await updateDoc(docRef, {
          name: formData.name
        })
        toast.success('Profile updated')
      }
    }catch (e) {
      toast.error(e.message)
    }
  }
  
  return (
    <>
      <div className="max-w-5xl mx-auto pt-[65px]">
        <div className="grid grid-cols-6 gap-4">
          <div className="col-span-1">
            <img className="object-cover rounded-full bg-gray-800 h-[150px] w-[150px]" src="/assets/images/u_225x300.png" alt="" />
          </div>
          <div className="col-span-5">
            <h1 className="font-semibold">Profile</h1>
            <div className="my-2 flex items-center before:flex-1 before:border-t before:border-gray-300">&nbsp;</div>
            <p>Name: {auth.currentUser.displayName}</p>
            <p>Role: {isAdmin ? 'Admin' : 'User'}</p>
            <p>Member since: time since</p>
            <div className="mt-3 px-6 py-12 max-w-xl border border-[#d0d0c8] bg-white rounded-md drop-shadow-sm hover:drop-shadow-lg transition ease-in-out duration-100">
              <form onSubmit={submitForm}>
                <label htmlFor="name" className="text-lg">Name</label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  className="w-full p-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition ease-in-out mb-3 focus:border focus:border-gray-500 focus-visible:border focus-visible:border-gray-500"
                  placeholder="Full name"
                  onChange={changeField}
                />
                <label htmlFor="email" className="text-lg">Email</label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  className="w-full p-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition ease-in-out mb-3 focus:border focus:border-gray-500 focus-visible:border focus-visible:border-gray-500"
                  placeholder="Email address"
                  disabled
                />
                <button type="submit" className="w-full bg-[#382110] text-white px-7 py-3 text-sm font-medium uppercase rounded shadow-md hover:bg-[#58371F] transition ease-in-out duration-50 active:bg-[#1A0F07]">Update</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Profile
