
import { doc, getDoc, updateDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { db } from "../firebase";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function UpdateUser({match}) {
    const { username } = useParams();
    const [usernameRN, setUsername] = useState();
    const [password, setPassword] = useState();
    const [userData, setUserData] = useState();
    const navigate = useNavigate();

    const getDocUsingUsername = async () => {
        const docRef = doc(db, "users", username);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            setUsername(docSnap.data().username);
            setPassword(docSnap.data().password)
            setUserData(docSnap.data());
            
        }
    }

    useEffect(() => {
        getDocUsingUsername();
    }, []);

    const updateUser = () => {
        console.log(usernameRN, password);
        const docRef = doc(db, "users", username);
        updateDoc(docRef, {username: usernameRN, password: password}).then(() => {
            alert('User updated');
            navigate('/home');
        }).catch(() => {

        });
    };

    return (
        <div style={{padding: 20}}>
            {userData && <Form>
                <h2 style={{paddingBottom: 10}}>Firebase Update</h2>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control disabled={true} value={usernameRN} onChange={(text) => setUsername(text.target.value)} type="email" placeholder="Enter email" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control value={password} onChange={(text) => setPassword(text.target.value)} type="text" placeholder="Password" />
                </Form.Group>
                
                <Button onClick={(e) => {updateUser(e)}} variant="primary">
                    Update
                </Button>
            </Form>}
        </div>
    )
}

export default UpdateUser;