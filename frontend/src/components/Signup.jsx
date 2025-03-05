
import React, { useState } from "react";
import axios from "axios";
import "./Signup.css";

function Signup() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSignup = async () => {
        try {
            await axios.post("http://localhost:3001/user/register", {
                name,
                email,
                password,
            });
            alert("Signup successful! You can now log in.");
            window.location.href = "/login";
        } catch (error) {
            alert("Signup failed: " + error.response.data.message);
        }
    };

    return (
        <div className="center-form">
            <form>
                <h2>Sign Up</h2>
                <label htmlFor="name">Name</label>
                <input
                    type="text"
                    id="name"
                    placeholder="Name"
                    className="form-control"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    id="email"
                    placeholder="Email"
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    id="password"
                    placeholder="Password"
                    className="form-control"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="button" className="btn" onClick={handleSignup}>Sign Up</button>
            </form>
        </div>
    );
}

export default Signup;
