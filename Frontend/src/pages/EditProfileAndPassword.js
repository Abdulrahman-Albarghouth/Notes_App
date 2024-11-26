import React, { useState, useEffect } from "react";
import axios from "axios";

const EditProfileAndPassword = () => {
    const API_URL = process.env.REACT_APP_API;
    const [profile, setProfile] = useState({
        username: "",
        email: "",
    });
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [message, setMessage] = useState("");

    
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const token = localStorage.getItem("access_token");
                const response = await axios.get(`${API_URL}/profile/`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setProfile(response.data);
            } catch (error) {
                alert("Failed to fetch profile information.");
            }
        };

        fetchProfile();
    }, []);

    
    const handleUpdateProfile = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem("access_token");
            await axios.patch(
                `${API_URL}/profile/`,
                profile,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setMessage("Profile updated successfully!");
        } catch (error) {
            alert("Failed to update profile.");
        }
    };

    
    const handleChangePassword = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem("access_token");
            await axios.post(
                `${API_URL}/change-password/`,
                {
                    old_password: oldPassword,
                    new_password: newPassword,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setMessage("Password updated successfully!");
            setOldPassword("");
            setNewPassword("");
        } catch (error) {
            alert(
                error.response?.data?.old_password?.[0] ||
                error.response?.data?.new_password?.[0] ||
                "Failed to update password."
            );
        }
    };

    return (
        <div className="card p-4">
            <h2>Edit Profile</h2>
            {message && <div className="alert alert-success">{message}</div>}
            
            <form onSubmit={handleUpdateProfile}>
                <div className="mb-3">
                    <label className="form-label">Username</label>
                    <input
                        type="text"
                        className="form-control"
                        value={profile.username}
                        onChange={(e) =>
                            setProfile({ ...profile, username: e.target.value })
                        }
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input
                        type="email"
                        className="form-control"
                        value={profile.email}
                        onChange={(e) =>
                            setProfile({ ...profile, email: e.target.value })
                        }
                    />
                </div>
                <button type="submit" className="btn btn-primary mb-4">
                    Update Profile
                </button>
            </form>

            <h2>Change Password</h2>
            
            <form onSubmit={handleChangePassword}>
                <div className="mb-3">
                    <label className="form-label">Old Password</label>
                    <input
                        type="password"
                        className="form-control"
                        value={oldPassword}
                        onChange={(e) => setOldPassword(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">New Password</label>
                    <input
                        type="password"
                        className="form-control"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                    />
                </div>
                <button type="submit" className="btn btn-primary">
                    Update Password
                </button>
            </form>
        </div>
    );
};

export default EditProfileAndPassword;
