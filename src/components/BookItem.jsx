import { Link } from 'react-router-dom'

const BookItem = (props) => {
  return (
    <div>
      <Link className="contents" to={`/book/${props.id}`}>
        <div className="h-[225px] w-[150px] bg-cover" style={{backgroundImage: `url(${props.book.imgUrls[0]})`}}>
        </div>
        <div>
          <p className="text-md line-clamp-2 font-semibold">{props.book.name}</p>
          <p className="text-sm italic">{props.book.author}</p>
        </div>
      </Link>
    </div>
  )
}

export default BookItem