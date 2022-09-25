import React, { useEffect, useState } from "react";
import Table from 'react-bootstrap/Table';
import { db } from '../firebase';
import { collection, deleteDoc, doc, getDocs, query, where } from "firebase/firestore";

function Home() {
    const [userList, setUserList] = useState([]);

    const deleteUser = async (user) => {
        console.log(user.username);
        const q = query(collection(db, "users"), where("username", "==", user.username));
        q.get().then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
              doc.ref.delete();
            });
          });
    };

    const updateUser = (user) => {
        console.log(user.username);
    };

    useEffect(() => {
        const getUsersData = async () => {
            const users = [];
            const snap = await getDocs(collection(db, "users"));
            snap.forEach((doc) => {
                console.log(doc.id, " => ", doc.data());
                
                users.push({...doc.data(), createdDate: `${new Date(doc.data().createdAt.seconds*1000)}`});
            })
            setUserList(users);
        };
        getUsersData();
    }, []);
    return (
        <div style={{padding: 20}}>
        <h2 style={{paddingBottom: 10}}>Firebase Firestore</h2>

        <Table striped bordered hover>
            <thead>
                <tr>
                <th>#</th>
                <th>Username</th>
                <th>Password</th>
                <th>Created At</th>
                <th>Update</th>
                <th>Delete</th>
                </tr>
            </thead>
            {userList.length && <tbody>
                {userList.length && userList.map((user, index) => (
                    <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{user.username}</td>
                        <td>{user.password}</td>
                        <td>{user.createdDate}</td>
                        <td onClick={() => updateUser(user)}>Update</td>
                        <td onClick={() => deleteUser(user)}>Delete</td>
                    </tr>
                ))}
            </tbody>}
        </Table>
        </div>
    )
}

export default Home;