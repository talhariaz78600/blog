import React, { useState, useEffect } from "react";
// import users from "./assests/users.png";

import { useSelector } from "react-redux";
import { selectUsers } from "../StoreRedux/UserSlice";
import { useParams } from "react-router-dom";


const UserDetails = () => {
  const storeAllUsers = useSelector(selectUsers);
  const { id } = useParams();
  const [user, setUser] = useState();
  useEffect(() => {
    let CurrentUser = storeAllUsers.find((userObject) => {
      return userObject._id === id;
    });

    setUser(CurrentUser)
    console.log(CurrentUser);

  }, [id, storeAllUsers]);



  return (
    <>
      {user && <div className="rounded-xl overflow-hidden flex shadow hover:shadow-md max-w-screen bg-white cursor-pointer">
        <div className="w-full p-3">
          <div className="    space-y-2 px-1 py-2">

            <div className="flex items-center justify-between  space-x-2 w-full">
              <div>
                <span className="text-gray-700 text-lg font-bold mx-1 mr-3">Name:</span>
                <span>{user.userName}</span>

              </div>

              {user.status ?
                <span className="text-white font-semibold px-4 py-1 rounded-md bg-green-600">
                  Active
                </span> : <span className="text-white font-semibold px-4 py-1 rounded-md bg-red-600">
                  Suspended
                </span>}
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-gray-700 text-lg font-bold mx-1 mr-3">
                Email:
              </span>
              <span>{user.email}</span>
            </div>


          </div>
        </div>


      </div>}
    </>
  );
};

export default UserDetails;
