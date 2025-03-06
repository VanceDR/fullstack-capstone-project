import React, { useState, useEffect } from 'react';
import { urlConfig } from '../../config'
import { useAppContext } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'


import './LoginPage.css';

function LoginPage() {

    //insert code here to create useState hook variables for email, password
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [incorrect, setIncorrect] = useState(false)

    const navigate = useNavigate();
    const bearerToken = sessionStorage.getItem('bearer-token');
    const { setIsLoggedIn } = useAppContext();

    useEffect(() => {
        if (sessionStorage.getItem('auth-token')) {
            navigate('/app')
        }
    }, [navigate])
    // insert code here to create handleLogin function and include console.log
    const handleLogin = async () => {
        try {
            const response = await fetch(`${urlConfig.backendUrl}/api/auth/login`, {
                //Task 7: Set Method
                method: 'POST',
                //Task 8: Set headers
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': bearerToken ? `Bearer ${bearerToken}` : ``
                },
                //Task 9: Set body to send user details
                body: JSON.stringify({
                    email: email,
                    password: password
                })
            })
            const json = await response.json()
            console.log(json);
            if (json.error) {
                setIncorrect("Wrong password or email. Try again.");
                setTimeout(() => {
                    setIncorrect("");
                }, 2000);
            } 
            if (json.authtoken) {
                sessionStorage.setItem('auth-token', json.authtoken);
                sessionStorage.setItem('name', json.userName);
                sessionStorage.setItem('email', json.userEmail);
                setIsLoggedIn(true)
                navigate('/app')
            }
        } catch (e) {
            console.log("Error fetching details: " + e.message);
        }
    }
    return (
        <div className="container-mb mt-5 mb-5">
            <div className="row justify-content-center">
                <div className="col-md-6 col-lg-4">
                    <div className="login-card p-4 border rounded">
                        <h2 className="text-center mb-4 font-weight-bold">Login</h2>

                        {/* insert code here to create input elements for the variables email and  password */}
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
                        {/* insert code here to create a button that performs the `handleLogin` function on click */}
                        <button className="btn btn-primary w-100 mb-3" onClick={handleLogin}>Login</button>
                        <p className="mt-4 text-center">
                            New here? <a href="/app/register" className="text-primary">Register Here</a>
                        </p>
                            <span style={{ color: 'red', height: '.5cm', display: 'block', fontStyle: 'italic', fontSize: '12px' }}>{incorrect}</span>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginPage;