import React, { useState } from 'react';
import JoditEditor from 'jodit-react';
import axios from "axios";
import imageCompression from 'browser-image-compression';
import {serverUrl} from "../../../config"
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { AddNewfood} from "../../../StoreRedux/foodSlice";
const Addfood = () => {
    const [selectedValue, setSelectedValue] = useState('');
    const [edu, setEdu] = useState({ title: '', home: false });
    const [content, setContent] = useState('');
    const [loader, setLoader] = useState(false);
    const [Image, setImage] = useState();
    const editor = React.useRef(null);
    const dispatch=useDispatch();


    const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 1920,
        useWebWorker: true,
    };


    const cloudName = 'dxtbs0yyv'; 
    const uploadPreset = 'zuifyjrj'; 

    const handleImageSelect = async (filename) => {
        const file = filename;
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', uploadPreset);
        formData.append('folder', 'product');
        try {
            const response = await axios.post(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, formData); // Changed the URL endpoint for image uploads
                console.log("upload")
             return response.data.secure_url
        } catch (error) {
            console.error('Error uploading image:', error);
            return "";
        }
    };

    const submit = async(e) => {
        e.preventDefault();
        let compressedFile1=null;
        let imageUrl=null;
        try{
            setLoader(true)
            if(Image){
                 compressedFile1 = await imageCompression(Image, options);
                 imageUrl= await handleImageSelect(compressedFile1);
            }
    
            const response = await axios.post(`${serverUrl}/api/blog/createBlog`, {
                title:edu.title, description:content, imageUrl:imageUrl,category:selectedValue ,home:edu.home
            })
            console.log(response)
            if (response && response.status === 200) {
                setLoader(false);
                dispatch(AddNewfood(response.data.data))
                console.log(response.data.data)
                toast.success(response.data.message);
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

    const onimage = (e) => {
        setImage(e.target.files[0])
    };

    const onchange = (e) => {
        const { name, value } = e.target;
        setEdu({ ...edu, [name]: value });
    };

    return (
        <form onSubmit={submit}>
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
                <label htmlFor="Image" className="block text-gray-700 text-sm font-bold mb-2 form-label-urdu">Image</label>
                <input type="file" required className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none" id="Image" accept="image/png, image/jpeg" name='Image' onChange={onimage} />
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
                <div className="flex items-center">
                    <input required className="form-check-input h-6 w-6 text-blue-600 focus:ring-blue-500 border-gray-300 rounded mt-1" onChange={onchange} value={edu.home === false ? true : true} type="checkbox" role="switch" name='home' />
                    <label className="ml-2 block text-gray-700 text-sm font-bold form-check-label form-label-urdu" htmlFor="flexSwitchCheckDefault">Home</label>
                </div>
            </div>

            <button type="submit" className={`bg-blue-500 text-white font-bold py-2 px-4 rounded ${loader === true ? "opacity-50 cursor-not-allowed" : ""}`} disabled={loader === true}>
                {loader === true ? (
                    <span>
                        <span className="spinner-border spinner-border-sm mr-2" role="status" aria-hidden="true"></span>
                        Uploading...
                    </span>
                ) : "Submit"}
            </button>
        </form>
    );
};

export default Addfood;
