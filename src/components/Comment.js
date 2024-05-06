import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Picker from 'emoji-picker-react';
import { FaSmile } from 'react-icons/fa';
import { useQuery } from '@apollo/client';
import { GET_COMMENTS_BY_POST } from '../gqlOperations/queries.js';

const Comment = ({ postId }) => {
    const [comment, setComment] = useState('');
    const [showPicker, setShowPicker] = useState(false);
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [selectedCommentIndex, setSelectedCommentIndex] = useState(null);
    const { loading, error, data } = useQuery(GET_COMMENTS_BY_POST, { variables: { postId } });

    useEffect(() => {
        if (!loading && data) {
            setSelectedCommentIndex(null);
        }
    }, [data, loading]);

    const handleCommentChange = (e) => {
        setComment(e.target.value);
    };

    const handleEmojiClick = (emojiObject) => {
        setComment(comment + emojiObject.emoji);
    };

    const handleEmojiPickerToggle = () => {
        setShowEmojiPicker(!showEmojiPicker);
    };

    const handleCommentClick = (index) => {
        if (selectedCommentIndex === index && showEmojiPicker) {
            setShowEmojiPicker(false);
        } else {
            setSelectedCommentIndex(index);
            setShowEmojiPicker(true);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const id = localStorage.getItem('userId');
            await axios.post('http://192.168.0.164:3001/user-comment', {
                commentContent: comment,
                postId: postId,
                userId: id
            });
            setComment('');
            const modalId = `exampleModal-${postId}`;
            const closeCommentModal = document.getElementById(modalId);
            const closeCommentModalBtn = document.getElementById(`closeCommentModal-${postId}`);
            if (closeCommentModal && closeCommentModalBtn) {
                closeCommentModalBtn.click();
            }
            else {
                console.error("Modal or close button not found");
            }
        } catch (error) {
            console.error('Error:', error.message);
        }
    };

    function getTimeAgo(timestamp) {
        const now = Date.now();
        const diff = now - timestamp;
        const seconds = Math.floor(diff / 1000);
        if (seconds >= 24 * 3600) {
            const days = Math.floor(seconds / (24 * 3600));
            return `${days} day${days > 1 ? 's' : ''} ago`;
        }
        else if (seconds >= 3600) {
            const hours = Math.floor(seconds / 3600);
            return `${hours} hour${hours > 1 ? 's' : ''} ago`;
        }
        else {
            const minutes = Math.floor(seconds / 60);
            return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
        }
    }

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error fetching comments...</p>;

    return (
        <div className="modal fade" id={`exampleModal-${postId}`} tabIndex="-1" aria-labelledby={`exampleModalLabel-${postId}`} aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id={`exampleModalLabel-${postId}`}>Comments</h5>
                        <button type="button" className="btn-close" id={`closeCommentModal-${postId}`} data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>

                    <div className="modal-body">
                        {data.commentsByPost.map((commentItem, index) => (
                            <div key={`comment-${index}`} className="d-flex flex-column m-0">
                                <div className="d-flex justify-content-start align-item-start m-0" style={{ cursor: "pointer" }} onClick={() => handleCommentClick(index)}>
                                    <strong>{commentItem.userID.userName}</strong>&nbsp;{commentItem.commentContent}
                                </div>
                                <div className='d-flex justify-content-start mb-1'>
                                    <span style={{ fontSize: "10px" }} className=''>{getTimeAgo(commentItem.commentAt)}</span>
                                </div>
                                {showEmojiPicker && selectedCommentIndex === index && (
                                    <div id='emoji' style={{ position: 'absolute', right: '5vw', bottom: "120px" }}>
                                        <Picker
                                            onEmojiClick={handleEmojiClick}
                                            height={600}
                                            disableSearchBar={true}
                                            disableSkinTonePicker={true}
                                            reactionsDefaultOpen={true}
                                        />
                                    </div>
                                )}
                            </div>
                        ))}

                        <form onSubmit={handleSubmit}>
                            <div className="mb-3 d-flex align-items-center position-relative">
                                <input
                                    placeholder='Add your comment....'
                                    type="text"
                                    className="form-control rounded-pill emoji-icon"
                                    id={`comment-${postId}`}
                                    name="comment"
                                    onClick={() => setShowEmojiPicker(false)} // Close emoji picker when input is clicked
                                    onChange={handleCommentChange}
                                    value={comment}
                                />
                                <FaSmile
                                    className="ml-2 me-2 cursor-pointer position-absolute end-0"
                                    onClick={handleEmojiPickerToggle}
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
