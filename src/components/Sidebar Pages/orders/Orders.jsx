import React, { useEffect, useState } from "react";
import { selectorders, updateorders } from "../../../StoreRedux/orderSlice";
import { useDispatch, useSelector } from "react-redux";
import { Loader } from "../../Loader/loader";
import DeleteModal from "../../DeleteModal";
import { toast } from "react-toastify";
import { serverUrl } from "../../../config";
// import OrderList from "../../Websocket";
import axios from "axios";
import { Link } from "react-router-dom";
const Orders = (props) => {
    const [myorders, setmyorders] = useState([]);
    const [delId, setdelId] = useState(null);
    const [showModal, setshowModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const storeAllOrders = useSelector(selectorders);
    const dispatch = useDispatch();
    useEffect(() => {
        const data = [...storeAllOrders].reverse();
        setmyorders(data);
        console.log(data);
    }, [storeAllOrders, dispatch]);

    const handleChange = async (status, id) => {
        let changestatus = false;
        if (status === true) {
            changestatus = false;
        }
        else {
            changestatus = true;
        }
        try {
            // console.log(changestatus)
            setLoading(true)
            const response = await axios.put(`${serverUrl}/api/order/updatestatus/${id}`, {
                status:changestatus
            })
            console.log(response.data.item);
            if (response && response.status === 200) {
                setLoading(false)

                dispatch(updateorders(response.data.item))
                toast.success(response.data.message)
            }
        } catch (error) {
            setLoading(false)
            if (error.response.status === 401) {
                toast.error(error.response.message);
            } else if (error.response.status === 400) {
                toast.error(error.response.message);
            } else if (error.response.status === 500) {
                toast.error(error.response.message);

            } else {
                toast.error("Failed to Update order status")
            }

        }
    }
    return (
        <>
            <div className="min-w-full overflow-x-auto">
                <h2 className="mr-3 font-bold text-2xl text-center mb-4 text-purple-700">All Orders</h2>
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="px-3 py-3 text-center min-w-[150px] text-md font-bold uppercase tracking-wider">
                                    Title
                                </th>
                                <th scope="col" className="px-3 py-3 text-center min-w-[200px] text-md font-bold uppercase tracking-wider">
                                    Price
                                </th>
                                <th scope="col" className="px-3 py-3 text-center min-w-[150px] text-md font-bold uppercase tracking-wider">
                                    Date
                                </th>
                                <th scope="col" className="px-3 py-3 text-center min-w-[100px] text-md font-bold uppercase tracking-wider">
                                    Update Status
                                </th>
                                <th scope="col" className="px-3 py-3 text-center min-w-[100px] text-md font-bold uppercase tracking-wider">
                                    Status
                                </th>
                                <th scope="col" className="px-3 py-3 text-center min-w-[100px] text-md font-bold uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {myorders && myorders.length > 0 ? (
                                myorders.map((user, index) => (
                                    <tr key={index} className="text-center">

                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-bold  curser-pointer text-purple-900">
                                           <Link to={`/Admin/orders/${user._id}`}>{user.title}</Link> 
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                            {user.price}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                            {convertIsoToSimpleDateTime(user.date)}
                                        </td>
                                        <td className=" font-medium text-gray-900">
                                            <select
                                                className="py-1 rounded-full bg-neutral-300 focus:outline-none focus:ring-0"
                                                
                                                onChange={(e) => {
                                                    // const newStatus = e.target.value === "completed" ? true : false;
                                                    handleChange(user.status, user._id);
                                                }}
                                            >
                                                <option selected={user.status===true?true:false} value="completed">Completed</option>
                                                <option selected={user.status===false?true:false}  value="pending">Pending</option>
                                            </select>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                            {user.status ? (
                                                <span className="px-4 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-200 text-green-900">
                                                    Completed
                                                </span>
                                            ) : (
                                                <span className="px-4 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-200 text-green-900">
                                                    Pending
                                                </span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                            <button
                                                onClick={() => {
                                                    setshowModal(true);
                                                    setdelId(user._id);
                                                }}
                                                className="ml-2 text-red-600 hover:text-red-900 text-2xl"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                                </svg>
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="7" className="p-2 font-semibold text-center">
                                        No orders found
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                {/* <OrderList></OrderList> */}
            </div>
            <Loader loading={loading} />
            <DeleteModal
                setloading={setLoading}
                showModal={showModal}
                setshowModal={setshowModal}
                delId={delId}
                whatdelete="order"
            />
        </>
    );
};
function convertIsoToSimpleDateTime(isoDateString) {
    const date = new Date(isoDateString);

    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}
export default Orders;
