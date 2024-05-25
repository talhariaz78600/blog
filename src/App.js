import React from "react";
import { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import "./App.css";
import { RoutingcallAuth } from "./components/Auth/RoutingcallAuth";
import { RoutingCallAdmin } from "./components/Admin/RoutingCallAdmin";

import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
// import 'flowbite';
import CryptoJS from 'crypto-js';
import { secretEnKey } from "./config";
import { useDispatch, useSelector } from "react-redux";
import { selectAdmin, addAmin } from "./StoreRedux/adminSlice";
function App() {
  const dispatch = useDispatch()
  const storeAdmin = useSelector(selectAdmin)
  const decryptUserData = (data) => {
    const decryptedBytes = CryptoJS.AES.decrypt(data, secretEnKey);
    const decryptedData = JSON.parse(decryptedBytes.toString(CryptoJS.enc.Utf8));
    return decryptedData;

  }
  console.log(storeAdmin)
  useEffect(() => {

    if (!storeAdmin) {

      const storedData = localStorage.getItem('ARABIC_ADMIN_KEY_STRING');
      console.log("sasa")
      if (storedData) {
        const { admin, expiration } = JSON.parse(storedData);
        if (expiration > Date.now()) {
          const adminData = decryptUserData(admin);
          dispatch(addAmin(adminData))

        } else {
          localStorage.removeItem('ARABIC_ADMIN_KEY_STRING');
          if (window.location.pathname !== "/login") {
            window.location.href = "/login";
          }
        }
      }
    }
  }, [storeAdmin, dispatch])

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/*" element={<RoutingcallAuth />} />
          {storeAdmin && <Route path="/Admin/*" element={<RoutingCallAdmin />} />}
        </Routes>
        <ToastContainer position="bottom-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />

      </div>
    </Router>
  );
}

export default App;
