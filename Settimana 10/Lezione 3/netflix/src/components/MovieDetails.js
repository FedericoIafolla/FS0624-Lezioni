import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './MovieDetails.css'; // Assicurati di avere il percorso corretto
import { ClipLoader } from 'react-spinners';

// La tua API Key
const API_KEY = '6953698b';

const MovieDetails = () => {
    const { movieId } = useParams();
    const [movieDetails, setMovieDetails] = useState(null);
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [newComment, setNewComment] = useState("");
    const [rating, setRating] = useState(0);
    const [editingCommentId, setEditingCommentId] = useState(null);
    const [editCommentText, setEditCommentText] = useState("");
    const [editRating, setEditRating] = useState(1);

    useEffect(() => {
        const fetchMovieDetails = async () => {
            try {
                const movieResponse = await fetch(`http://www.omdbapi.com/?apikey=${API_KEY}&i=${movieId}`);
                if (!movieResponse.ok) throw new Error('Failed to fetch movie details');
                const movieData = await movieResponse.json();
                if (movieData.Response === "True") {
                    setMovieDetails(movieData);
                } else {
                    throw new Error(movieData.Error);
                }

                const commentsResponse = await fetch(`https://striveschool-api.herokuapp.com/api/comments/${movieId}`, {
                    headers: { 'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmNmMjA2MjAwOGQxMDAwMTVkZDNiNGUiLCJpYXQiOjE3MjQ4NTAyNzQsImV4cCI6MTcyNjA1OTg3NH0.KFK9aex6ISFoXbsSZTo8JIeub5YxMMR-UgydUsklpAs` }
                });
                if (!commentsResponse.ok) throw new Error('Failed to fetch comments');
                const commentsData = await commentsResponse.json();
                setComments(commentsData);

            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchMovieDetails();
    }, [movieId]);

    const handleAddComment = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`https://striveschool-api.herokuapp.com/api/comments/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmNmMjA2MjAwOGQxMDAwMTVkZDNiNGUiLCJpYXQiOjE3MjQ4NTAyNzQsImV4cCI6MTcyNjA1OTg3NH0.KFK9aex6ISFoXbsSZTo8JIeub5YxMMR-UgydUsklpAs`
                },
                body: JSON.stringify({
                    comment: newComment,
                    rate: rating.toString(),
                    elementId: movieId
                })
            });

            if (!response.ok) {
                const errorText = await response.text();
                console.error('Add Comment Error:', errorText);
                throw new Error('Failed to add comment');
            }

            const addedComment = await response.json();
            setComments([...comments, addedComment]);
            setNewComment("");
            setRating(0);
        } catch (err) {
            setError(err.message);
        }
    };

    const handleUpdateComment = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`https://striveschool-api.herokuapp.com/api/comments/${editingCommentId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmNmMjA2MjAwOGQxMDAwMTVkZDNiNGUiLCJpYXQiOjE3MjQ4NTAyNzQsImV4cCI6MTcyNjA1OTg3NH0.KFK9aex6ISFoXbsSZTo8JIeub5YxMMR-UgydUsklpAs`
                },
                body: JSON.stringify({
                    comment: editCommentText,
                    rate: editRating.toString(),
                    elementId: movieId
                })
            });

            if (!response.ok) {
                const errorText = await response.text();
                console.error('Update Comment Error:', errorText);
                throw new Error('Failed to update comment');
            }

            const updatedComment = await response.json();
            setComments(comments.map(comment => comment._id === editingCommentId ? updatedComment : comment));
            setEditingCommentId(null);
        } catch (err) {
            setError(err.message);
        }
    };

    const startEditing = (comment) => {
        setEditingCommentId(comment._id);
        setEditCommentText(comment.comment);
        setEditRating(parseInt(comment.rate));
    };

    const handleDeleteComment = async (commentId) => {
        try {
            const response = await fetch(`https://striveschool-api.herokuapp.com/api/comments/${commentId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmNmMjA2MjAwOGQxMDAwMTVkZDNiNGUiLCJpYXQiOjE3MjQ4NTAyNzQsImV4cCI6MTcyNjA1OTg3NH0.KFK9aex6ISFoXbsSZTo8JIeub5YxMMR-UgydUsklpAs`
                }
            });

            if (!response.ok) {
                const errorText = await response.text();
                console.error('Delete Comment Error:', errorText);
                throw new Error('Failed to delete comment');
            }

            setComments(comments.filter(comment => comment._id !== commentId));
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="movie-details-container">
            {loading ? (
                <div className="movie-details-loading">
                    <ClipLoader color="#ffffff" loading={loading} size={50} />
                </div>
            ) : error ? (
                <div className="movie-details-error">
                    <p>Error: {error}</p>
                </div>
            ) : (
                <div className="movie-details-content">
                    <img
                        src={movieDetails?.Poster}
                        alt={movieDetails?.Title}
                        className="movie-details-poster"
                    />
                    <div className="movie-details-info">
                        <h1>{movieDetails?.Title}</h1>
                        <p><strong>Year:</strong> {movieDetails?.Year}</p>
                        <p><strong>Genre:</strong> {movieDetails?.Genre}</p>
                        <p><strong>Director:</strong> {movieDetails?.Director}</p>
                        <p><strong>Actors:</strong> {movieDetails?.Actors}</p>
                        <p><strong>Plot:</strong> {movieDetails?.Plot}</p>
                        <p><strong>Rating:</strong> {movieDetails?.imdbRating}</p>
                    </div>
                    <div className="movie-details-comments">
                        <h2>Comments</h2>
                        {comments.length > 0 ? comments.map(comment => (
                            <div key={comment._id} className="comment-card">
                                {editingCommentId === comment._id ? (
                                    <form onSubmit={handleUpdateComment} className="comment-form">
                                        <textarea
                                            value={editCommentText}
                                            onChange={(e) => setEditCommentText(e.target.value)}
                                            required
                                        />
                                        <div className="rating-container">
                                            <label>Rating:</label>
                                            <input
                                                type="number"
                                                value={editRating}
                                                onChange={(e) => setEditRating(parseInt(e.target.value))}
                                                min="1"
                                                max="5"
                                                required
                                            />
                                        </div>
                                        <div className="comment-form-buttons">
                                            <button type="submit" className="save">Save</button>
                                            <button type="button" className="cancel" onClick={() => setEditingCommentId(null)}>Cancel</button>
                                        </div>
                                    </form>
                                ) : (
                                    <>
                                        <p className="comment-author">{comment.comment}</p>
                                        <p className="comment-rating">Rating: {comment.rate}</p>
                                        <button className="update-btn" onClick={() => startEditing(comment)}>Update</button>
                                        <button className="delete-btn" onClick={() => handleDeleteComment(comment._id)}>Delete</button>
                                    </>
                                )}
                            </div>
                        )) : (
                            <p>No comments yet</p>
                        )}
                        <form onSubmit={handleAddComment} className="comment-form">
                            <textarea
                                value={newComment}
                                onChange={(e) => setNewComment(e.target.value)}
                                placeholder="Add your comment here"
                                required
                            />
                            <div className="rating-container">
                                <label>Rating:</label>
                                <input
                                    type="number"
                                    value={rating}
                                    onChange={(e) => setRating(parseInt(e.target.value))}
                                    min="1"
                                    max="5"
                                    required
                                />
                            </div>
                            <button type="submit" className="add-comment">Add Comment</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MovieDetails;