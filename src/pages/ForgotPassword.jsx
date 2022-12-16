import { useState } from 'react'
import { Link } from 'react-router-dom'
import OAuth from '../components/OAuth'

const ForgotPassword = () => {
  const [email, setEmail] = useState("")
  
  function changeField(e){
    setEmail(e.target.value)
  }
  
  function submitForm(e){
    e.preventDefault()
  }
  
  return (
    <section className="h-screen w-full bg-[#f4f1ea80] pt-5">
      <div className="max-w-7xl mx-auto">
        <a href="/" className="w-[180px] h-[50px] block mx-auto" style={{backgroundImage: "url(/assets/images/logo.png)", backgroundSize: "180px", backgroundRepeat: "no-repeat"}}>
        </a>
        <h1 className="text-3xl text-center font-thin color-[#1e1915] mb-5">Forgot Password</h1>
        <div className="mt-3 px-6 py-12 max-w-xl mx-auto border border-[#d0d0c8] bg-white rounded-md drop-shadow-sm hover:drop-shadow-lg transition ease-in-out duration-100">
          <form onSubmit={submitForm}>
            <label htmlFor="email" className="text-lg">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              className="w-full p-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition ease-in-out mb-3 focus:border focus:border-gray-500 focus-visible:border focus-visible:border-gray-500"
              onChange={changeField}
              placeholder="Email address"/>
            <button type="submit" className="w-full bg-[#382110] text-white px-7 py-3 text-sm font-medium uppercase rounded shadow-md hover:bg-[#58371F] transition ease-in-out duration-50 active:bg-[#1A0F07]">Send reset password</button>
            <div className="my-4 flex items-center before:flex-1 before:border-t before:border-gray-300 after:flex-1 after:border-t after:border-gray-300">
              <p className="text-center font-semibold mx-4">OR</p>
            </div>
            <OAuth />
            <div className="flex justify-between whitespace-nowrap text-sm sm:text-lg">
              <p className="mb-6">Not a member?
                <Link to="/sign-up" className="font-semibold text-[#1e1915] hover:underline transition ease-in-out duration-200 ml-1">Sign Up</Link>
              </p>
              <p>
                <Link to="/sign-in" className="font-semibold text-[#1e1915] hover:underline transition ease-in-out duration-200 ml-1">Sign In</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}

export default ForgotPassword
