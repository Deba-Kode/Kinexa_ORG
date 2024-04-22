// import React, { useState } from 'react';
// import axios from 'axios';

// const Comment = () => {
//     const [formData, setFormData] = useState({
//         comment: ''
//     });

//     const handleCommentChange = (e) => {
//         const { name, value } = e.target;
//         setFormData({
//             ...formData,
//             [name]: value
//         });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             const response = await axios.post('http://localhost:3001/user-comment', {
//                 commentContent: formData.comment
//             });
//             console.log(response.data);
//         } catch (error) {
//             console.error('Error:', error.message);
//         }

//         // Check if the element exists before attempting to click it
//         const closeCommentModalBtn = document.getElementById("closeCommentModal");
//         if (closeCommentModalBtn) {
//             closeCommentModalBtn.click();
//         } else {
//             console.error("Close button not found");
//         }
//     };

//     return (
//         <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
//             <div className="modal-dialog modal-dialog-centered">
//                 <div className="modal-content">
//                     <div className="modal-header">
//                         <h5 className="modal-title" id="exampleModalLabel">Comments</h5>
//                         <button type="button" className="btn-close" id="closeCommentModal" data-bs-dismiss="modal" aria-label="Close"></button>
//                     </div>
//                     <div className="modal-body">
//                         <form onSubmit={handleSubmit}>
//                             <div className="mb-3">
//                                 <label htmlFor="comment" className="form-label">Comments:</label>
//                                 <input
//                                     placeholder='Add your comment....'
//                                     type="text"
//                                     className="form-control rounded-pill" // Adding the rounded-pill class for curved borders
//                                     id="comment"
//                                     name="comment"
//                                     onChange={handleCommentChange}
//                                     value={formData.comment}
//                                 />
//                             </div>
//                             <button type="submit" className="btn btn-primary">Submit</button>
//                         </form>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Comment;










import React, { useState } from 'react';
import axios from 'axios';
import Picker from 'emoji-picker-react';
import { FaSmile } from 'react-icons/fa';

const Comment = ({ postId }) => {
    const [comment, setComment] = useState('');
    const [showPicker, setShowPicker] = useState(false);

    const handleCommentChange = (e) => {
        setComment(e.target.value);
    };

    const handleEmojiClick = (emojiObject) => {
        setComment(comment + emojiObject.emoji);
        setShowPicker(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3001/user-comment', {
                commentContent: comment,
                postId: postId
            });
            console.log(response.data);

            // Close the modal
            const modalId = `exampleModal-${postId}`;
            const closeCommentModal = document.getElementById(modalId);
            const closeCommentModalBtn = document.getElementById(`closeCommentModal-${postId}`);
            if (closeCommentModal && closeCommentModalBtn) {
                closeCommentModalBtn.click();
            } else {
                console.error("Modal or close button not found");
            }
        } catch (error) {
            console.error('Error:', error.message);
        }
    };

    return (
        <div className="modal fade" id={`exampleModal-${postId}`} tabIndex="-1" aria-labelledby={`exampleModalLabel-${postId}`} aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id={`exampleModalLabel-${postId}`}>Comments</h5>
                        <button type="button" className="btn-close" id={`closeCommentModal-${postId}`} data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>

                    <div className="modal-body">
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3 d-flex align-items-center position-relative">
                                <input
                                    placeholder='Add your comment....'
                                    type="text"
                                    className="form-control rounded-pill emoji-icon"
                                    id={`comment-${postId}`}
                                    name="comment"
                                    onChange={handleCommentChange}
                                    value={comment}
                                />
                                <FaSmile
                                    className="ml-2 me-2 cursor-pointer position-absolute end-0"
                                    onClick={() => setShowPicker(!showPicker)}
                                    style={{ width: "30px", height: "30px", cursor: "pointer" }}
                                />
                                {
                                    showPicker && (
                                        <div className="position-absolute">
                                            <Picker
                                                pickerStyle={{ width: '100%' }}
                                                onEmojiClick={handleEmojiClick}
                                            />
                                        </div>
                                    )
                                }
                            </div>
                            <button type="submit" className="btn btn-primary">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Comment;

