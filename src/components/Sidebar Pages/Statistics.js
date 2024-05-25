import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { selectfoods } from "../../StoreRedux/foodSlice";




const Statistics = () => {
  const [dataarry, setDataarray] = useState([])
  const storeBooks = useSelector(selectfoods);
  useEffect(() => {
    const alldata=[];
    let cat = null;
    storeBooks.map((item) => {
      cat = item.category;
      if (cat) {
        const filterdata = storeBooks.filter((data) => data.category === cat)
        const check = alldata.find((item) => item.catagory === cat)
        if (!check) {
          alldata.push({ catagory: cat, data: filterdata })
        }
      }
      return cat;
    })
    console.log(alldata);
    setDataarray(alldata);
    // eslint-disable-next-line
  }, [storeBooks])
  return (
    <div>
      <h2 className="text-3xl font-bold mt-8 mb-5 text-gray-900 sm:text-4xl">
        Statistics
      </h2>

      {/* <h1 className="text-lg font-bold font-serif">Users</h1>

      <div className="w-full mt-10  grid grid-cols-2 gap-3 px-6 ">
        {storeAllUsers &&
          <div className="flex col-span-2 items-center  px-5  py-6 shadow-lg rounded-md bg-slate-300">

            <div className="p-3 rounded-full bg-purple-600 bg-opacity-75">
              <svg
                className="h-8 w-8 text-white"
                viewBox="0 0 28 30"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M18.2 9.08889C18.2 11.5373 16.3196 13.5222 14 13.5222C11.6804 13.5222 9.79999 11.5373 9.79999 9.08889C9.79999 6.64043 11.6804 4.65556 14 4.65556C16.3196 4.65556 18.2 6.64043 18.2 9.08889Z"
                  fill="currentColor"
                ></path>
                <path
                  d="M25.2 12.0444C25.2 13.6768 23.9464 15 22.4 15C20.8536 15 19.6 13.6768 19.6 12.0444C19.6 10.4121 20.8536 9.08889 22.4 9.08889C23.9464 9.08889 25.2 10.4121 25.2 12.0444Z"
                  fill="currentColor"
                ></path>
                <path
                  d="M19.6 22.3889C19.6 19.1243 17.0927 16.4778 14 16.4778C10.9072 16.4778 8.39999 19.1243 8.39999 22.3889V26.8222H19.6V22.3889Z"
                  fill="currentColor"
                ></path>
                <path
                  d="M8.39999 12.0444C8.39999 13.6768 7.14639 15 5.59999 15C4.05359 15 2.79999 13.6768 2.79999 12.0444C2.79999 10.4121 4.05359 9.08889 5.59999 9.08889C7.14639 9.08889 8.39999 10.4121 8.39999 12.0444Z"
                  fill="currentColor"
                ></path>
                <path
                  d="M22.4 26.8222V22.3889C22.4 20.8312 22.0195 19.3671 21.351 18.0949C21.6863 18.0039 22.0378 17.9556 22.4 17.9556C24.7197 17.9556 26.6 19.9404 26.6 22.3889V26.8222H22.4Z"
                  fill="currentColor"
                ></path>
                <path
                  d="M6.64896 18.0949C5.98058 19.3671 5.59999 20.8312 5.59999 22.3889V26.8222H1.39999V22.3889C1.39999 19.9404 3.2804 17.9556 5.59999 17.9556C5.96219 17.9556 6.31367 18.0039 6.64896 18.0949Z"
                  fill="currentColor"
                ></path>
              </svg>
            </div>

            <div className="mx-5">
              <h4 className="text-2xl font-semibold text-gray-700">
                {storeAllUsers ? storeAllUsers.length : "0"}
              </h4>
              <div className="text-gray-500">Toatal Users</div>
            </div>
          </div>}

     

        {storeAllUsers &&
          <div className="flex my-4 items-center col-span-2 md:col-span-1 px-5 py-6 shadow-lg rounded-md bg-slate-300">
            <div className="p-3 rounded-full bg-green-600 bg-opacity-75">
              <svg
                className="h-8 w-8 text-white"
                viewBox="0 0 28 30"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M18.2 9.08889C18.2 11.5373 16.3196 13.5222 14 13.5222C11.6804 13.5222 9.79999 11.5373 9.79999 9.08889C9.79999 6.64043 11.6804 4.65556 14 4.65556C16.3196 4.65556 18.2 6.64043 18.2 9.08889Z"
                  fill="currentColor"
                ></path>
                <path
                  d="M25.2 12.0444C25.2 13.6768 23.9464 15 22.4 15C20.8536 15 19.6 13.6768 19.6 12.0444C19.6 10.4121 20.8536 9.08889 22.4 9.08889C23.9464 9.08889 25.2 10.4121 25.2 12.0444Z"
                  fill="currentColor"
                ></path>
                <path
                  d="M19.6 22.3889C19.6 19.1243 17.0927 16.4778 14 16.4778C10.9072 16.4778 8.39999 19.1243 8.39999 22.3889V26.8222H19.6V22.3889Z"
                  fill="currentColor"
                ></path>
                <path
                  d="M8.39999 12.0444C8.39999 13.6768 7.14639 15 5.59999 15C4.05359 15 2.79999 13.6768 2.79999 12.0444C2.79999 10.4121 4.05359 9.08889 5.59999 9.08889C7.14639 9.08889 8.39999 10.4121 8.39999 12.0444Z"
                  fill="currentColor"
                ></path>
                <path
                  d="M22.4 26.8222V22.3889C22.4 20.8312 22.0195 19.3671 21.351 18.0949C21.6863 18.0039 22.0378 17.9556 22.4 17.9556C24.7197 17.9556 26.6 19.9404 26.6 22.3889V26.8222H22.4Z"
                  fill="currentColor"
                ></path>
                <path
                  d="M6.64896 18.0949C5.98058 19.3671 5.59999 20.8312 5.59999 22.3889V26.8222H1.39999V22.3889C1.39999 19.9404 3.2804 17.9556 5.59999 17.9556C5.96219 17.9556 6.31367 18.0039 6.64896 18.0949Z"
                  fill="currentColor"
                ></path>
              </svg>
            </div>

            <div className="mx-5">
              <h4 className="text-2xl font-semibold text-gray-700">
                {+storeAllUsers.length - +suspended}
              </h4>
              <div className="text-gray-500">Active users</div>
            </div>
          </div>}


        <div className="flex my-4 items-center col-span-2  md:col-span-1 px-5 py-6 shadow-lg rounded-md bg-slate-300">
          <div className="p-3 rounded-full bg-red-600 bg-opacity-75">
            <svg
              className="h-8 w-8 text-white"
              viewBox="0 0 28 30"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M18.2 9.08889C18.2 11.5373 16.3196 13.5222 14 13.5222C11.6804 13.5222 9.79999 11.5373 9.79999 9.08889C9.79999 6.64043 11.6804 4.65556 14 4.65556C16.3196 4.65556 18.2 6.64043 18.2 9.08889Z"
                fill="currentColor"
              ></path>
              <path
                d="M25.2 12.0444C25.2 13.6768 23.9464 15 22.4 15C20.8536 15 19.6 13.6768 19.6 12.0444C19.6 10.4121 20.8536 9.08889 22.4 9.08889C23.9464 9.08889 25.2 10.4121 25.2 12.0444Z"
                fill="currentColor"
              ></path>
              <path
                d="M19.6 22.3889C19.6 19.1243 17.0927 16.4778 14 16.4778C10.9072 16.4778 8.39999 19.1243 8.39999 22.3889V26.8222H19.6V22.3889Z"
                fill="currentColor"
              ></path>
              <path
                d="M8.39999 12.0444C8.39999 13.6768 7.14639 15 5.59999 15C4.05359 15 2.79999 13.6768 2.79999 12.0444C2.79999 10.4121 4.05359 9.08889 5.59999 9.08889C7.14639 9.08889 8.39999 10.4121 8.39999 12.0444Z"
                fill="currentColor"
              ></path>
              <path
                d="M22.4 26.8222V22.3889C22.4 20.8312 22.0195 19.3671 21.351 18.0949C21.6863 18.0039 22.0378 17.9556 22.4 17.9556C24.7197 17.9556 26.6 19.9404 26.6 22.3889V26.8222H22.4Z"
                fill="currentColor"
              ></path>
              <path
                d="M6.64896 18.0949C5.98058 19.3671 5.59999 20.8312 5.59999 22.3889V26.8222H1.39999V22.3889C1.39999 19.9404 3.2804 17.9556 5.59999 17.9556C5.96219 17.9556 6.31367 18.0039 6.64896 18.0949Z"
                fill="currentColor"
              ></path>
            </svg>
          </div>

          <div className="mx-5">
            <h4 className="text-2xl font-semibold text-gray-700">
              {suspended ? suspended : "0"}
            </h4>
            <div className="text-gray-500">Suspended users</div>
          </div>
        </div>
      </div> */}
      <hr></hr>
      <h1 className="text-lg font-bold font-serif my-2">Blogs</h1>
      <div className="w-full  grid grid-cols-1 gap-3 px-6 ">
        {storeBooks &&
          <div className="flex col-span-1 items-center px-5 my-5 py-6 shadow-sm rounded-md bg-slate-300">

            <div className="p-1 rounded-full bg-purple-600 bg-opacity-75">

              <img className="h-8 m-3 " src="/allblogs.svg" alt="blogsitems" />

            </div>

            <div className="mx-5">
              <h4 className="text-2xl font-semibold text-gray-700">
                {storeBooks ? storeBooks.length : "0"}
              </h4>
              <div className="text-gray-500">Total Blogs</div>
            </div>
          </div>}
      </div>

      <hr></hr>

      <div className="w-full  grid grid-cols-2 gap-3 px-6 ">


        {dataarry.length > 0 && dataarry.map((item, index) => {
          return <div key={index} className="flex col-span-2 md:col-span-1 items-center px-5 my-5 py-6 shadow-sm rounded-md bg-slate-300">

            <div className="p-3 rounded-full bg-green-600 bg-opacity-75">

              <img className="h-8" src="/logo.svg" alt="" />

            </div>

            <div className="mx-5">
              <h4 className="text-2xl font-semibold text-gray-700">
                {item.data.length}
              </h4>
              <div className="text-gray-500">{item.catagory}</div>
            </div>
          </div>
        })}


      </div>



    </div>
  );
};

export default Statistics;
