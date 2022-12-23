import { Link } from 'react-router-dom'

const BookItem = (props) => {
  return (
    <div>
      <Link className="contents" to={`/book/${props.id}`}>
        <div className="h-[225px] w-[150px] bg-cover" style={{backgroundImage: `url(${props.book.imgUrls[0]})`}}>
        </div>
      </Link>
    </div>
  )
}

export default BookItem