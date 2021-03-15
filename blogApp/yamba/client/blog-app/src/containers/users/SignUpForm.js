import axios from 'axios';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import appSettings from '../../appSettings';

const SignUpForm = (props) => {
    let attemptSignUp = (e) => {
        e.preventDefault();
        let userInitials = { name, email, password };

        axios.post(`${appSettings.server_base_url}/users/signup`, userInitials)
            .then(success => {
                if (success.data.status) {
                    props.history.push('/blogs')
                    localStorage.setItem('signedInUserName', success.data.signedInUserName)
                } else {
                    alert('Invalid details...')
                }
            })
            .catch(err => {
                console.log(err)
            })
    }

    let [name, setName] = useState('');
    let [email, setEmail] = useState('');
    let [password, setPassword] = useState('');
    
    return (
        <div>
            <form onSubmit={attemptSignUp}>
                <label>
                    Name: <input type='text' value={name} onChange={(e) => setName(e.target.value)} />
                </label>
                <label>
                    Email <input type='text' value={email} onChange={(e) => setEmail(e.target.value)} />
                </label>
                <label>
                    Password <input type='text' value={password} onChange={(e) => setPassword(e.target.value)} />
                </label>
                <br />
                <br />
                <button>SIGN UP</button>
            </form>
            <br />
            <br />
            <button><Link to='/signin'>SIGN IN</Link></button>
        </div>
    )
}

export default SignUpForm;
