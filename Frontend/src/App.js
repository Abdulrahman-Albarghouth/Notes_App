import React from "react";
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Notes from "./pages/Notes";
import CreateNote from "./pages/CreateNote";
import EditProfileAndPassword from "./pages/EditProfileAndPassword";

const Header = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        alert("Logged out successfully!");
        navigate("/login");
    };

    const isLoggedIn = localStorage.getItem("access_token");

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container">
                <Link className="navbar-brand" to="/notes">My Notes</Link>
                <div className="collapse navbar-collapse">
                    {isLoggedIn && (
                        <ul className="navbar-nav ms-auto">
                            <li className="nav-item">
                                <Link className="nav-link" to="/edit-profile">Edit Profile</Link>
                            </li>
                            <li className="nav-item">
                                <button className="btn btn-danger nav-link" onClick={handleLogout}>
                                    Logout
                                </button>
                            </li>
                        </ul>
                    )}
                </div>
            </div>
        </nav>
    );
};

function App() {
    return (
        <Router>
            <Header />
            <div className="container">
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/notes" element={<Notes />} />
                    <Route path="/create-note" element={<CreateNote />} />
                    <Route path="/create-note/:id" element={<CreateNote />} />
                    <Route path="/edit-profile" element={<EditProfileAndPassword />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
