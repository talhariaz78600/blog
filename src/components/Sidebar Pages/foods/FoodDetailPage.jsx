import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { selectfoods } from '../../../StoreRedux/foodSlice';
import { useSelector } from 'react-redux';
function BookDetailPage() {
    const bookdata = useSelector(selectfoods)
    const { blogId } = useParams();
    const [book, setBook] = useState(null);

    useEffect(() => {
        const datadetail = bookdata.find(data => data._id === blogId)
        console.log(datadetail)
        setBook(datadetail);
          // eslint-disable-next-line
    }, [bookdata]);

    return (
        <div className="container mx-auto md:px-4">
            {book ? (
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                    <div className="p-4">
                      <img className='w-full h-[300px]' src={book.imageUrl} alt="fooditem" />
                    </div>
                    <div className="p-4">
                        <h3 className="text-2xl font-semibold text-purple-800 ">{book.title}</h3>
                        <small>{new Intl.DateTimeFormat("en", {
                            weekday: 'long',
                            month: 'long',
                            day: 'numeric',
                            year: 'numeric',
                        }).format(new Date(book.data))}</small>
                        <div className='mt-4 content' style={{lineHeight:"2.5"}} dangerouslySetInnerHTML={{ __html: book.description }}></div>
                        {/* <p className="text-sm text-gray-600 my-2"><span className=' text-purple-600 font-bold mr-2'>Ingredients: </span>{book.Ingredients}</p> */}
                    </div>
                </div>

            ) : (
                <p className='text-center m-5 text-xl'>Loading...</p>
            )}
        </div>
    );
}

export default BookDetailPage;
