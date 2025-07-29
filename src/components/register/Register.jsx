import "./Register.css";
import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import api from "../../api/apiConfig.js";
import {useAuth} from "../../context/AuthContext.jsx";

const Register = () => {
    const { login } = useAuth();

    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    const [error, setError] = useState("");
    const navigate = useNavigate();

    const addUser = async (data) => {
        const response = await api.post("/auth/register", {
            email: data.email,
            password: data.password,
            fullName: data.fullName
        });
        if(response.data.statusCode === "201"){
            let user = {
                "token": response.data.data.accessToken,
                "userId": response.data.data.user._id,
                "username": response.data.data.user.fullName,
                "email": response.data.data.user.email,
            };
            login(user);
            navigate('/');
        } else {
            setError(response.data.statusMessage);
            navigate("/register");
        }
    }

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const { fullName, email, password, confirmPassword } = formData;

        if (!fullName || !email || !password || !confirmPassword) {
            setError("All fields are required.");
            return;
        }

        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        setError("");

        addUser(formData);
    };

    return (
        <div className="register-container" id="register">
            <h2>Register</h2>
            <Form onSubmit={handleSubmit}>
                {error && <Alert variant="danger">{error}</Alert>}

                <Form.Group className="mb-3">
                    <Form.Label column={true}>Name</Form.Label>
                    <Form.Control
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label column={true}>Email</Form.Label>
                    <Form.Control
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label column={true}>Password</Form.Label>
                    <Form.Control
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label column={true}>Confirm Password</Form.Label>
                    <Form.Control
                        type="password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                <Button variant="primary" type="submit" style={{ background: "teal" }}>
                    Register
                </Button>
            </Form>
        </div>
    );
};

export default Register;
