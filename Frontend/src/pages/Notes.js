import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Notes = () => {
    const API_URL = process.env.REACT_APP_API;
    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchNotes = async () => {
            try {
                const token = localStorage.getItem("access_token");
                const response = await axios.get(`${API_URL}/notes/`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setNotes(response.data);
            } catch (error) {
                if (error.response && error.response.status === 401) {
                    alert("Session expired. Please login again.");
                    navigate("/login");
                }
            } finally {
                setLoading(false);
            }
        };

        fetchNotes();
    }, [navigate]);

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this note?");
        if (!confirmDelete) return;

        try {
            const token = localStorage.getItem("access_token");
            await axios.delete(`${API_URL}/notes/${id}/`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setNotes(notes.filter((note) => note.id !== id));
            alert("Note deleted successfully!");
        } catch (error) {
            alert("Failed to delete note.");
        }
    };

    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center vh-100">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    return (
        <div className="container mt-4">
            <h1 className="mb-4">Your Notes</h1>
            <button
                className="btn btn-primary mb-3"
                onClick={() => navigate("/create-note")}
            >
                Create New Note
            </button>
            {notes.length === 0 ? (
                <p className="text-center">No notes found. Create a new note to get started!</p>
            ) : (
                <div className="row">
                    {notes.map((note) => (
                        <div key={note.id} className="col-md-4 mb-4">
                            <div className="card h-100">
                                <div className="card-body">
                                    <h5 className="card-title">{note.title}</h5>
                                    <p className="card-text">{note.description}</p>
                                    {note.audio && (
                                        <audio controls src={note.audio} className="w-100"></audio>
                                    )}
                                </div>
                                <div className="card-footer d-flex justify-content-between">
                                    <button
                                        className="btn btn-warning"
                                        onClick={() => navigate(`/create-note/${note.id}`)}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className="btn btn-danger"
                                        onClick={() => handleDelete(note.id)}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Notes;
