import React, { useEffect, useState } from "react";
import { saveMiqatsToJSON } from "./createJson/createJson";

import { selectUsers, updateUserStatus } from "../../StoreRedux/UserSlice";
import {selectorders} from "../../StoreRedux/orderSlice"
import { useDispatch, useSelector } from "react-redux";
import { Loader } from "../Loader/loader";
import DeleteModal from "../DeleteModal";
import { toast } from "react-toastify";
import { serverUrl } from "../../config";
import axios from "axios";

const Users = (props) => {
  const [myusers, setmyusers] = useState([]);
  const [delId, setdelId] = useState(null);
  const [showModal, setshowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const storeAllUsers = useSelector(selectUsers);
  const storeAllOrders = useSelector(selectorders);
  const dispatch = useDispatch();
  useEffect(() => {
    setmyusers(storeAllUsers);
    console.log(storeAllUsers);
  }, [storeAllUsers, dispatch]);

  const handleChange = async (status, id) => {
    let changestatus = false;
    if (status === true) {
      changestatus = false;
    }
    else {
      changestatus = true;
    }
    try {
      setLoading(true)
      const response = await axios.post(`${serverUrl}/api/users/${id}/update_user_status`, {
        status: changestatus
      })
      console.log(response.data.user);
      if (response && response.status === 200) {
        setLoading(false)

        dispatch(updateUserStatus(response.data.user))
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
        toast.error("Failed to Update user status")
      }

    }
  }
  return (
    <>
      <div className="min-w-full overflow-x-auto">
        {storeAllUsers && storeAllUsers.length > 0 &&
          <div className="text-right w-full flex items-center justify-end">
            <div className="flex items-center justify-center gap-2">
              <h2 className="font-semibold text-green-600">
                Download Record (json)
              </h2>
              <div className="cursor-pointer" onClick={() => {
                saveMiqatsToJSON(storeAllUsers, "users")
              }}>

                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
                </svg>
              </div>
            </div>
          </div>
        }
        <h2 className="mr-3 font-bold text-2xl text-center mb-4 text-purple-700">All Users</h2>





        <div className="overflow-x-auto">
          <table className="min-w-full bg-white divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-3 py-3 text-center min-w-[150px] text-md font-bold uppercase tracking-wider">
                  Profile
                </th>
                <th scope="col" className="px-3 py-3 text-center min-w-[200px] text-md font-bold uppercase tracking-wider">
                  Email
                </th>
                <th scope="col" className="px-3 py-3 text-center min-w-[150px] text-md font-bold uppercase tracking-wider">
                  Mobile No
                </th>
                <th scope="col" className="px-3 py-3 text-center min-w-[100px] text-md font-bold uppercase tracking-wider">
                  Address
                </th>
                <th scope="col" className="px-3 py-3 text-center min-w-[100px] text-md font-bold uppercase tracking-wider">
                  Update Status
                </th>
                <th scope="col" className="px-3 py-3 text-center min-w-[100px] text-md font-bold uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-3 py-3 text-center min-w-[100px] text-md font-bold uppercase tracking-wider">
                  Orders
                </th>
                <th scope="col" className="px-3 py-3 text-center min-w-[100px] text-md font-bold uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {myusers && myusers.length > 0 ? (
                myusers.map((user, index) => (
                  <tr key={index} className="text-center">
                    <td className="px-6 py-4 whitespace-nowrap text-sm flex justify-center font-medium  text-gray-900">
                      {!user.ProfileImageUrl || user.ProfileImageUrl === "" ? <img className="rounded-full h-16" src="/profile.jpg" alt="userImage" />
                        : <img className="rounded-full h-16" src={user.ProfileImageUrl} alt="userImage" />}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {user.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {user.mobileNumber}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {user.address}
                    </td>
                    <td className=" font-medium text-gray-900">
                      <input
                        className="mr-2 cursor-pointer mt-[0.3rem] h-5 w-5 appearance-none rounded-full bg-neutral-300 checked:bg-primary focus:outline-none focus:ring-0"
                        type="checkbox"
                        role="switch"
                        id={`flexSwitchChecked-${index}`} // Use a unique ID for each checkbox if rendering in a loop
                        onChange={() => handleChange(user.status, user._id)}
                        checked={user.status}
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      {user.status ? (
                        <span className="px-4 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-200 text-green-900">
                          Active
                        </span>
                      ) : (
                        <span className="px-4 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-200 text-green-900">
                          Suspended
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      <div className="relative inline-block cursor-pointer">
                        <i className="fa-solid fa-cart-shopping text-purple-900 text-[30px] cursor-pointer"></i>
                        <span className="absolute top-0 right-0 bg-red-500 text-white px-0.5 rounded-full  text-xs">
                        {storeAllOrders? storeAllOrders.filter((item)=>item.userId===user._id).length : "0"}
                        </span>
                      </div>
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
                    No user found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>


      </div>
      <Loader loading={loading} />
      <DeleteModal
        setloading={setLoading}
        showModal={showModal}
        setshowModal={setshowModal}
        delId={delId}
        whatdelete="user"
      />
    </>
  );
};

export default Users;
