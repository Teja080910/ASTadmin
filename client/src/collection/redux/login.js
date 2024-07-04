import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
const login = (username) => ({
    type: 'LOGIN',
    payload: { username },
});


export const Appstore = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const sessionUsername = useSelector((state) => state.user.username);

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch({type:'LOGIN',payload:{username}});
    };

    return (
        <form onSubmit={handleSubmit}>
            <h1>Hello: {sessionUsername}</h1>
            <label>
                Username:
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
            </label>
            <label>
                Password:
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </label>
            <button type="submit">Login</button>
        </form>
    );
};