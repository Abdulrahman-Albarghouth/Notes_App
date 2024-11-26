import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";



const CreateNote = () => {
    const API_URL = process.env.REACT_APP_API;
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [audioBlob, setAudioBlob] = useState(null);
    const [isRecording, setIsRecording] = useState(false);
    const mediaRecorder = React.useRef(null);
    const audioChunks = React.useRef([]);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (id) {
            const fetchNote = async () => {
                try {
                    const token = localStorage.getItem("access_token");
                    const response = await axios.get(
                        `${API_URL}/notes/${id}/`,
                        {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                        }
                    );
                    setTitle(response.data.title);
                    setDescription(response.data.description);
                } catch (error) {
                    alert("Failed to fetch the note.");
                }
            };

            fetchNote();
        }
    }, [id]);

    const startRecording = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            mediaRecorder.current = new MediaRecorder(stream);
            audioChunks.current = [];

            mediaRecorder.current.ondataavailable = (event) => {
                audioChunks.current.push(event.data);
            };

            mediaRecorder.current.onstop = () => {
                const blob = new Blob(audioChunks.current, { type: "audio/webm" });
                setAudioBlob(blob);
            };

            mediaRecorder.current.start();
            setIsRecording(true);
        } catch (error) {
            alert("Error accessing the microphone.");
        }
    };

    const stopRecording = () => {
        mediaRecorder.current.stop();
        setIsRecording(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("access_token");
        const formData = new FormData();
        formData.append("title", title);
        formData.append("description", description);
        if (audioBlob) {
            formData.append("audio", audioBlob, "recording.webm");
        }

        try {
            if (id) {
                await axios.patch(`${API_URL}/notes/${id}/`, formData, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                alert("Note updated successfully!");
            } else {
                await axios.post(`${API_URL}/notes/`, formData, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                alert("Note created successfully!");
            }
            navigate("/notes");
        } catch (error) {
            alert("Failed to save the note.");
        }
    };

    return (
        <div className="container mt-4">
            <h1>{id ? "Edit Note" : "Create Note"}</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Title</label>
                    <input
                        type="text"
                        className="form-control"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Description</label>
                    <textarea
                        className="form-control"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    {isRecording ? (
                        <button type="button" className="btn btn-danger" onClick={stopRecording}>
                            Stop Recording
                        </button>
                    ) : (
                        <button type="button" className="btn btn-primary" onClick={startRecording}>
                            Start Recording
                        </button>
                    )}
                </div>
                {audioBlob && <audio controls src={URL.createObjectURL(audioBlob)} />}
                <button type="submit" className="btn btn-success mt-3">
                    Save Note
                </button>
            </form>
        </div>
    );
};

export default CreateNote;
