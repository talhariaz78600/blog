import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { selectfoods } from '../../../StoreRedux/foodSlice';
import { selectorders } from '../../../StoreRedux/orderSlice';
import { selectUsers } from '../../../StoreRedux/UserSlice'
import { useSelector } from 'react-redux';
function OrderDetailPage() {
    const bookdata = useSelector(selectfoods)
    const orderdata = useSelector(selectorders)
    const userdata = useSelector(selectUsers)
    const { orderId } = useParams();
    const [book, setBook] = useState(null);
    const [user, setUser] = useState(null);
    useEffect(() => {
        const order = orderdata.find(data => data._id === orderId)
        const datadetail = bookdata.find(data => data._id === order.productId)
        setBook(datadetail);
        const userInfo = userdata.find(data => data._id === order.userId)
        setUser(userInfo);
        // eslint-disable-next-line
    }, [bookdata]);

    return (
        <div className="container mx-auto md:px-4">
            {book ? (
                <div className="bg-white grid grid-cols-2 rounded-lg shadow-md overflow-hidden">
                    <div className="col-span-2 md:col-span-1">
                        <img className="h-[250px] w-full" src={book.itemImageUrl} alt="fooditem" />
                    </div>
                    <div className="col-span-2 md:col-span-1  flex flex-col justify-center p-4">
                        <h3 className="text-2xl font-semibold text-purple-800">{book.title}</h3>
                        <p className="text-sm text-gray-600 my-2">
                            <span className="text-purple-600 font-bold">Price:</span> ${book.itemPrice}
                        </p>
                        <p className="text-sm text-gray-600 my-2">
                            <span className="text-purple-600 font-bold">Ingredients:</span> {book.Ingredients}
                        </p>
                        <p className="text-sm text-gray-600 my-2">
                            <span className="text-purple-600 font-bold">Description:</span> {book.Description}
                        </p>
                    </div>
                    <div className='col-span-2 '>
                        <h1 className='text-2xl font-bold p-4 text-purple-900'>User Detail:</h1>
                    </div>
                    <div className="col-span-2 md:col-span-1  flex flex-col justify-center p-4">
                        <p className="text-sm text-gray-600 md:my-2">
                            <span className="text-purple-600 font-bold">Email: </span> {user.email}
                        </p>
                        <p className="text-sm text-gray-600 md:my-2">
                            <span className="text-purple-600 font-bold">Mobile Number: </span> {user.mobileNumber}
                        </p>
                       
                    </div>
                    <div className="col-span-2 md:col-span-1 flex flex-col justify-center p-4">
                        <p className="text-sm text-gray-600 md:my-2">
                            <span className="text-purple-600 font-bold">Address: </span> {user.address}
                        </p>

                    </div>
                </div>


            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}

export default OrderDetailPage;
