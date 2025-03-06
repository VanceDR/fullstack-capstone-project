import React, { useState } from 'react';
import { urlConfig } from '../../config'
import { useAppContext } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom';

import './RegisterPage.css';

function RegisterPage() {

    //insert code here to create useState hook variables for firstName, lastName, email, password
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [showError, setShowError] = useState('')
    
    const navigate = useNavigate();
    const { setIsLoggedIn } = useAppContext();

    // insert code here to create handleRegister function and include console.log
    const handleRegister = async () => {
        try {
            const response = await fetch(`${urlConfig.backendUrl}/api/auth/register`, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                },
                body: JSON.stringify({
                    "firstName": firstName,
                    "lastName": lastName,
                    "email": email,
                    "password": password
                }),
            })
            const json = await response.json();
            if (json.error) {
                setShowError(json.error);
                setTimeout(() => setShowError(''), 2000)
            }

            if (json.authtoken) {
                sessionStorage.setItem('auth-token', json.authtoken)
                sessionStorage.setItem('name', firstName);
                sessionStorage.setItem('email', json.email);
                setIsLoggedIn(true);
                navigate('/app')
            }
            
            
        } catch (err) {
            console.log("Error fetching details: " + err.message);
        }
        
    }

    
    return (
        <div className="conatiner-mb mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6 col-lg-4">
                    <div className="register-card p-4 border rounded">
                        <h2 className="text-center mb-4 font-weight-bold">Register</h2>

                        {/* insert code here to create input elements for all the variables - firstName, lastName, email, password */}
                        <div className="mb-3">

                            <label htmlFor="firstName" className="form label"> First Name</label><br />
                            <input
                                id="firstName"
                                type="text"
                                className="form-control"
                                placeholder="Enter your First Name"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                            />
                        </div>
                        <div className="mb-3">

                            <label htmlFor="lastName" className="form label"> Last Name</label><br />
                            <input
                                id="lastName"
                                type="text"
                                className="form-control"
                                placeholder="Enter your Last Name"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                            />
                        </div>
                        <div className="mb-3">

                            <label htmlFor="emailInput" className="form label"> Email</label><br />
                            <input
                                id="emailInput"
                                type="email"
                                className="form-control"
                                placeholder="Enter your Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="mb-3">

                            <label htmlFor="passwordInput" className="form label"> Password</label><br />
                            <input
                                id="passwordInput"
                                type="password"
                                className="form-control"
                                placeholder="Enter your Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        {/* insert code here to create a button that performs the `handleRegister` function on click */}
                        <button className="btn btn-primary w-100 mb-3" onClick={handleRegister}>Register</button>
                        <p className="mt-4 text-center">
                            Already a member? <a href="/app/login" className="text-primary">Login</a>
                        </p>

                    </div>
                    <div className="text-danger">{showError}</div>
                </div>
            </div>
        </div>

    )//end of return
}

export default RegisterPage;