import React, { useState, useEffect } from "react";
import axios from "axios";
import { serverUrl } from "../../../config";
// import { Loader } from "../../Loader/loader";
import { useDispatch, useSelector } from "react-redux";
import { updatefoods, selectfoods } from "../../../StoreRedux/foodSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import JoditEditor from 'jodit-react';
// import { PDFDocument } from 'pdf-lib';
const Editfood = () => {
    const [selectedValue, setSelectedValue] = useState();
    const [edu, setEdu] = useState({ title: '', home: false });
    const [content, setContent] = useState('');
    const [loader, setLoader] = useState(false);
    const {blogId}=useParams();
    const editor = React.useRef(null);
    const dispatch=useDispatch();
    const allblogs=useSelector(selectfoods);
    const host =useNavigate()



    useEffect(()=>{
        if(allblogs.length>0){
       const data= allblogs.find((item)=>item._id===blogId)
       setEdu({title:data.title,home:data.home})
       setContent(data.description)
       setSelectedValue(data.category);}
       // eslint-disable-next-line
    },[allblogs])

    const submit = async(e) => {
        e.preventDefault();
        try{
            setLoader(true)
      
    
            const response = await axios.put(`${serverUrl}/api/blog/update/${blogId}`, {
                title:edu.title, description:content,category:selectedValue ,home:edu.home
            })
            console.log(response)
            if (response && response.status === 200) {
                setLoader(false);
                dispatch(updatefoods(response.data.data))
                console.log(response.data.data)
                toast.success(response.data.message);
                host("/Admin/blogs")
                // setaddbook(doorinitial);
            }
        }catch(error){
            setLoader(false);
            console.error(error);
            if (error.response) {
                toast.error(error.response.data.message);
            }
        }

    };

    const handleSelectChange = (e) => {
        setSelectedValue(e.target.value);
    };

  

    const onchange = (e) => {
        const { name, value } = e.target;
        console.log(value);
   
        setEdu({ ...edu, [name]: value });
    };
    return (
        <div>
       {selectedValue&&<form onSubmit={submit}>
        <h1 className="text-center m-4 font-bold text-xl">Edit Blog</h1>
            <div className="mb-4">
                <label htmlFor="selectInput" className="block text-gray-700 text-sm font-bold mb-2">
                    Select an option:
                </label>
                <select
                    id="selectInput"
                    className="block w-full mt-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    value={selectedValue}
                    onChange={handleSelectChange}
                    required
                >
                    <option value="">Choose...</option>
                    <option value="News" className="form-control-urdu">News</option>
                    <option value="Education" className="form-control-urdu">Education</option>
                    <option value="Sports" className="form-control-urdu">Sports</option>
                    <option value="Entertainment" className="form-control-urdu">Entertainment</option>
                    <option value="Business" className="form-control-urdu">Business</option>
                    <option value="Health" className="form-control-urdu">Health</option>
                    <option value="Crypto" className="form-control-urdu">Crypto</option>
                    <option value="Abode" className="form-control-urdu">Abode</option>
                    <option value="Cbc" className="form-control-urdu">Cbc</option>
                    <option value="E-Commerce" className="form-control-urdu">E-Commerce</option>
                </select>
            </div>


            <div className="mb-4">
                <label htmlFor="title" className="block text-gray-700 text-sm font-bold mb-2 form-label-urdu">Tile</label>
                <input type="text" required className="block w-full mt-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" name='title' onChange={onchange} id="title" value={edu.title} placeholder="Enter the Title" />
            </div>

            <div className="mb-4">
                <label htmlFor="message" className="block text-gray-700 text-sm font-bold mb-2">Description</label>
                <JoditEditor
                    className="w-full border rounded-md"
                    ref={editor}
                    value={content}
                    required
                    onBlur={newContent => setContent(newContent)}
                    onChange={() => { }}
                />
            </div>

            <div className="mb-4">
                <label htmlFor="home" className=" text-gray-700 text-sm font-bold mb-2">
                    Home:
                </label>
                <select
                    id="selectInput"
                    className="block  mt-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    value={edu.home}
                    onChange={onchange}
                    name="home"
                >
                    <option value={true} className="form-control-urdu">Home</option>
                    <option value={false} className="form-control-urdu">Remove</option>
         
                </select>
            </div>

            <button type="submit" className={`bg-blue-500 text-white font-bold py-2 px-4 rounded ${loader === true ? "opacity-50 cursor-not-allowed" : ""}`} disabled={loader === true}>
                {loader === true ? (
                    <span>
                        <span className="spinner-border spinner-border-sm mr-2" role="status" aria-hidden="true"></span>
                        Uploading...
                    </span>
                ) : "Update"}
            </button>
        </form>}

        </div>
    );
};

export default Editfood;