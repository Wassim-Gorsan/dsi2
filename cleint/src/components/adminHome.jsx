import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const AdminHome = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8009/users")
            .then(res => {
                console.log("sssss", res.data.users);
                setUsers(res.data.users);
            })
            .catch(err => console.log(err));
    }, []);

    const divStyle = {
        width: '80%',
        margin: '50px auto',
        backgroundColor: '#fff',
        padding: '20px',
        boxShadow: '0 0 10px rgba(0,0,0,0.1)',
        borderRadius: '8px'
    };

    const tableStyle = {
        width: '100%',
        borderCollapse: 'collapse',
        marginTop: '20px'
    };

    const thTdStyle = {
        padding: '12px',
        textAlign: 'left',
        borderBottom: '1px solid #ddd'
    };

    const thStyle = {
        backgroundColor: '#4CAF50',
        color: 'white'
    };

    const trHoverStyle = {
        backgroundColor: '#f5f5f5'
    };

    const buttonStyle = {
        display: 'block',
        width: '150px',
        padding: '10px',
        margin: '20px auto',
        backgroundColor: '#4CAF50',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer'
    };

    const buttonHoverStyle = {
        backgroundColor: '#45a049'
    };

    return (
        <div style={divStyle}>
            <h1>Users List</h1>
            <table style={tableStyle}>
                <thead>
                    <tr>
                        <th style={{...thTdStyle, ...thStyle}}>Name</th>
                        <th style={{...thTdStyle, ...thStyle}}>Email</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.id} style={trHoverStyle}>
                            <td style={thTdStyle}>{user.name}</td>
                            <td style={thTdStyle}>{user.email}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Link to="/upl">
                <button style={buttonStyle} onMouseOver={(e) => e.currentTarget.style.backgroundColor = buttonHoverStyle.backgroundColor} onMouseOut={(e) => e.currentTarget.style.backgroundColor = buttonStyle.backgroundColor}>
                    Upload Image
                </button>
            </Link>
        </div>
    );
};

export default AdminHome;
