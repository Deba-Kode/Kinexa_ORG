import React, { useState } from 'react';
import axios from 'axios';

const CreatePostModal = () => {
    const [formData, setFormData] = useState({
        imageUpload: null,
        caption: ''
    });

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setFormData({
            ...formData,
            imageUpload: file
        });
    };

    const handleCaptionChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formDataToSend = new FormData();
        formDataToSend.append('imageUpload', formData.imageUpload);
        formDataToSend.append('caption', formData.caption);
        try {
            const response = await axios.post('http://192.168.31.162:3001/upload-post', formDataToSend);
            console.log(response.data);
        } catch (error) {
            console.error('Error:', error.message);
        }
        document.getElementById("closeModal").click();
    };

    return (
        <div>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" style={{ zIndex: 1050 }}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title w-100 fs-5 d-flex align-items-end justify-content-between" id="exampleModalLabel">
                                <span className="title_create" style={{ color: "black" }}>Create new post</span>
                            </h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <i className="bi bi-file-earmark" style={{ fontSize: '10rem', color: "black" }}></i>
                            <p style={{ color: "black" }}>Drag photos and videos here</p>
                            <form id="upload-form" className="text-center p-5 border rounded" onSubmit={handleSubmit}>
                                <input className="form-control mb-3" type="file" id="image-upload" name="imageUpload" onChange={handleFileChange} />
                                <input className="form-control mb-3" type="text" id="caption" name="caption" placeholder="Enter caption" value={formData.caption} onChange={handleCaptionChange} />
                                <button type="submit" className="btn btn-primary">Submit</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreatePostModal;
