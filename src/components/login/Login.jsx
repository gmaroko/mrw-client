import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import api from "../../api/apiConfig.js";
import {useAuth} from "../../context/AuthContext.jsx";

const Login = () => {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [error, setError] = useState("");
    const { login } = useAuth();
    const navigate = useNavigate();


    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const userLogin = async (email, password) => {
        const response = await api.post("/auth/login", {
            email: email,
            password: password
        });
        if (response.data.statusCode === "200") {
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
            navigate('/login');
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const { email, password } = formData;
        if (!email || !password) {
            setError("Both fields are required.");
            return;
        }
        setError("");
        userLogin(email, password);
    };

    return (
        <div className="login-container">
            <h2>Login</h2>
            <Form onSubmit={handleSubmit}>
                {error && <Alert variant="danger">{error}</Alert>}
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

                <Button variant="primary" type="submit">
                    Login
                </Button>
            </Form>
        </div>
    );
};

export default Login;
