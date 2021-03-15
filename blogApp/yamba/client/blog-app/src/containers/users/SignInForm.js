import axios from 'axios';
import React, { useState } from 'react';
import appSettings from '../../appSettings';

const SignInForm = (props) => {
    let attemptSignIn = (e) => {
        e.preventDefault();
        let userInitials = { email, password };
        axios.post(`${appSettings.server_base_url}/users/signin`, userInitials)
            .then(success => {
                if (success.data.status) {
                    props.history.push('/blogs')
                    localStorage.setItem('signedInUserName', success.data.signedInUserName)
                } else {
                    alert('Invalid details...' || success.data.errorMessage)
                }
            })
            .catch(err => {
                console.log(err)
            })
    }
    let [email, setEmail] = useState('');
    let [password, setPassword] = useState('');
    return (
        <div>
            <form onSubmit={attemptSignIn}>
                <label>
                    Email <input type='text' value={email} onChange={(e) => setEmail(e.target.value)} />
                </label>
                <label>
                    Password <input type='text' value={password} onChange={(e) => setPassword(e.target.value)} />
                </label>
                <br />
                <br />
                <button>SIGN IN</button>
            </form>
        </div>
    )
}

export default SignInForm;
