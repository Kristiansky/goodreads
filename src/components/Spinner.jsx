import spinner from "../assets/gif/spinner.gif";
const Spinner = () => {
  return (
    <div className="bg-white bg-opacity-50 flex items-center justify-center fixed left-0 right-0 bottom-0 top-0 z-50">
      <div>
        <img src={spinner} alt="loading" className="h-[250px]"/>
      </div>
    </div>
  )
}

export default Spinner;
