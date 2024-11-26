import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const API_URL = process.env.REACT_APP_API;
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    

    useEffect(() => {
        if (localStorage.getItem("access_token")) {
            navigate("/notes");
        }
    }, [navigate]);

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${API_URL}/register/`, {
                username,
                email,
                password,
            });
            alert("Account created successfully!");
            navigate("/login");
        } catch (error) {
            alert("Error creating account");
        }
    };

    return (
        <div>
            <h1>Register</h1>
            <form onSubmit={handleRegister}>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">Register</button>
            </form>
        </div>
    );
};

export default Register;
