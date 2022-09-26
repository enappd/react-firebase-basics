import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from "react-router-dom";
import { auth, db } from '../firebase';
import { doc, setDoc, collection } from 'firebase/firestore';
function Register() {
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const navigate = useNavigate();

    const loginUser = (e) => {
        e.preventDefault();
        console.log(username, password);
        createUserWithEmailAndPassword(auth, username, password)
        .then(async (userCredential) => {
            const user = userCredential.user;
            const userRef = doc(db, "users", username);
            await setDoc(userRef, {username: username, password: password, createdAt: new Date()});
            navigate('/home');
            console.log(user);
        }).catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert(errorMessage);
        })
    }

    return (
        <div style={{padding: 20}}>
            <Form>
                <h2 style={{paddingBottom: 10}}>Firebase Register</h2>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control onChange={(text) => setUsername(text.target.value)} type="email" placeholder="Enter email" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control onChange={(text) => setPassword(text.target.value)} type="password" placeholder="Password" />
                </Form.Group>
                
                <Button onClick={(e) => {loginUser(e)}} variant="primary" type="submit">
                    Register
                </Button>
                <Button onClick={(e) => {navigate('/')}} style={{marginLeft: 10}} variant="primary">
                    Login
                </Button>
            </Form>
        </div>
    )
}

export default Register;