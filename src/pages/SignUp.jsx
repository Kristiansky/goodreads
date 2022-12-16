import { useState } from 'react'
import {BsEyeFill, BsEyeSlashFill} from "react-icons/bs";
import { Link } from 'react-router-dom'
import OAuth from '../components/OAuth'

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  })
  
  function changeField(e){
    setFormData((prevState => ({
      ...prevState,
      [e.target.id]: e.target.value
    })))
  }
  
  function submitForm(e){
    e.preventDefault()
  }
  
  return (
    <section className="h-screen w-full bg-[#f4f1ea80] pt-5">
      <div className="max-w-7xl mx-auto">
        <a href="/" className="w-[180px] h-[50px] block mx-auto" style={{backgroundImage: "url(/assets/images/logo.png)", backgroundSize: "180px", backgroundRepeat: "no-repeat"}}>
        </a>
        <h1 className="text-3xl text-center font-thin color-[#1e1915] mb-5">Sign Up</h1>
        <div className="mt-3 px-6 py-12 max-w-xl mx-auto border border-[#d0d0c8] bg-white rounded-md drop-shadow-sm hover:drop-shadow-lg transition ease-in-out duration-100">
          <form onSubmit={submitForm}>
            <label htmlFor="name" className="text-lg">Name</label>
            <input
              type="text"
              id="name"
              value={formData.name}
              className="w-full p-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition ease-in-out mb-3 focus:border focus:border-gray-500 focus-visible:border focus-visible:border-gray-500"
              onChange={changeField}
              placeholder="Full name"/>
            <label htmlFor="email" className="text-lg">Email</label>
            <input
              type="email"
              id="email"
              value={formData.email}
              className="w-full p-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition ease-in-out mb-3 focus:border focus:border-gray-500 focus-visible:border focus-visible:border-gray-500"
              onChange={changeField}
              placeholder="Email address"/>
            <div className="relative">
              <label htmlFor="password" className="text-lg">Password</label>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={formData.password}
                className="w-full p-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition ease-in-out mb-3 focus:border focus:border-gray-500 focus-visible:border focus-visible:border-gray-500"
                onChange={changeField}
                placeholder="Password"/>
              {showPassword ? (
                <BsEyeFill className="absolute right-3 top-10 text-xl cursor-pointer" onClick={()=>setShowPassword(prevState => !prevState)}/>
              ): (
                <BsEyeSlashFill className="absolute right-3 top-10 text-xl cursor-pointer" onClick={()=>setShowPassword(prevState => !prevState)}/>
              )}
            </div>
            <button type="submit" className="w-full bg-[#382110] text-white px-7 py-3 text-sm font-medium uppercase rounded shadow-md hover:bg-[#58371F] transition ease-in-out duration-50 active:bg-[#1A0F07]">Sign Up</button>
            <div className="my-4 flex items-center before:flex-1 before:border-t before:border-gray-300 after:flex-1 after:border-t after:border-gray-300">
              <p className="text-center font-semibold mx-4">OR</p>
            </div>
            <OAuth />
            <div className="flex justify-between whitespace-nowrap text-sm sm:text-lg">
              <p className="mb-6">Already a member?
                <Link to="/sign-in" className="font-semibold text-[#1e1915] hover:underline transition ease-in-out duration-200 ml-1">Sign In</Link>
              </p>
              <p>
                <Link to="/forgot-password" className="font-semibold text-[#1e1915] hover:underline transition ease-in-out duration-200 ml-1">Forgot password?</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}

export default SignUp
