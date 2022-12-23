import { useState } from 'react'
import { toast } from 'react-toastify'
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import {getAuth} from "firebase/auth";
import {v4 as uuidv4} from "uuid"
import {addDoc, collection, serverTimestamp} from "firebase/firestore";
import {db} from "../firebase"
import { useNavigate } from 'react-router'

const AddBook = () => {
  const navigate = useNavigate()
  const auth = getAuth()
  
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    author: "",
    genre: "",
    images: {}
  })
  
  function changeField(e) {
    let boolean = null;
    if(e.target.value === "true"){
      boolean = true;
    }
    if(e.target.value === "false"){
      boolean = false;
    }
    //Files
    if(e.target.files){
      setFormData((prevState) => ({
        ...prevState,
        images: e.target.files
      }))
    }
    //Text / Boolean / Number
    if(!e.target.files){
      console.log('test')
      setFormData((prevState) => ({
        ...prevState,
        [e.target.id]: boolean ?? e.target.value
      }))
    }
  }
  
  async function formSubmit (e) {
    e.preventDefault()
    if(formData.images.length > 6){
      toast.error("Maximum 6 images are allowed.")
      return
    }
  
    async function storeImage(image){
      return new Promise((resolve, reject)=>{
        const storage = getStorage()
        const filename = `${auth.currentUser.uid}-${image.name}-${uuidv4()}`
        const storageRef = ref(storage, filename);
        const uploadTask = uploadBytesResumable(storageRef, image);
      
        uploadTask.on('state_changed',
          (snapshot) => {
            // Observe state change events such as progress, pause, and resume
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
            switch (snapshot.state) {
              case 'paused':
                console.log('Upload is paused');
                break;
              case 'running':
                console.log('Upload is running');
                break;
            }
          },
          (error) => {
            reject(error)
          },
          () => {
            // Handle successful uploads on complete
            // For instance, get the download URL: https://firebasestorage.googleapis.com/...
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              resolve(downloadURL);
            });
          }
        );
      })
    }
    
    const imgUrls = await Promise.all(
      [...formData.images].map((image) => storeImage(image))
    ).catch((error) => {
      toast.error(error.message)
      return;
    })
  
    const formDataCopy = {
      ...formData,
      imgUrls,
      timestamp: serverTimestamp(),
      userRef: auth.currentUser.uid,
    }
  
    delete formDataCopy.images;
    const docRef = await addDoc(collection(db, "books"), formDataCopy)
    toast.success("Book added!")
    navigate(`/book/${docRef.id}`)
  }
  
  return (
    <div className="max-w-5xl mx-auto pt-[65px]">
      <h1 className="font-semibold">Add a book</h1>
      <div className="my-2 flex items-center before:flex-1 before:border-t before:border-gray-300">&nbsp;</div>
      <form onSubmit={formSubmit}>
        <p className="text-lg font-semibold">Name</p>
        <input type="text" id="name" value={formData.name} onChange={changeField} placeholder="Book Name" maxLength="255" minLength="2" required className="w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition ease-in-out duration-150 focus:text-gray-700 focus:bg-white focus:border-slate-600 mb-6"/>
        <p className="text-lg font-semibold">Description</p>
        <textarea id="description" value={formData.description} onChange={changeField} placeholder="Description" required className="w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition ease-in-out duration-150 focus:text-gray-700 focus:bg-white focus:border-slate-600 mb-6"/>
        <p className="text-lg font-semibold">Author</p>
        <input type="text" id="author" value={formData.author} onChange={changeField} placeholder="Book Author" maxLength="255" minLength="2" required className="w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition ease-in-out duration-150 focus:text-gray-700 focus:bg-white focus:border-slate-600 mb-6"/>
        <p className="text-lg font-semibold">Genre</p>
        <select className="p-2 w-full bg-white border border-gray-300 text-gray-700 rounded text-xl mb-3" id="genre" onChange={changeField}>
          <option value="Comedy">Comedy</option>
          <option value="Drama">Drama</option>
          <option value="Science">Science</option>
          <option value="Education">Education</option>
          <option value="Biography">Biography</option>
          <option value="Business">Business</option>
          <option value="Classics">Classics</option>
          <option value="Comics">Comics</option>
          <option value="Contemporary">Contemporary</option>
          <option value="Cookbooks">Cookbooks</option>
          <option value="Crime">Crime</option>
          <option value="Ebooks">Ebooks</option>
        </select>
        <div className="mb-6">
          <p className="text-lg font-semibold">Image</p>
          <p className="text-gray-600">The first image will be the cover (max 6)</p>
          <input type="file" id="images" onChange={changeField} accept=".jpg,.png,.jpeg" multiple required className="w-full px-3 py-1.5 text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:bg-white focus:border-slate-600"/>
        </div>
        <button type="submit" className="mb-6 w-full px-7 py-3 bg-[#382110] text-white font-medium text-sm uppercase rounded shadow-md hover:bg-[#58371F] hover:shadow-lg active:bg-[#1A0F07] active:shadow-lg transition duration-150 ease-in-out">Submit</button>
      </form>
    </div>
  )
}

export default AddBook
