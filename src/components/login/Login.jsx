import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import api from "../../api/apiConfig.js";

const Login = () => {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const login = async (email, password) => {
        const response = await api.post("/auth/login", {
            email: email,
            password: password
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const { email, password } = formData;

        if (!email || !password) {
            setError("Both fields are required.");
            return;
        }

        setError("");

        login(email, password).then(r => {
            if (r && r.successful) {
                localStorage.setItem("token", r?.accessToken);
                localStorage.setItem("userId", r?.user._id);
                localStorage.setItem("username", r?.user.fullName);
                navigate("/");
            } else {
                setError(r?.statusMessage);
            }
        });
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
