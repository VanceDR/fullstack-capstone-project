import React, { useEffect } from 'react';
import { useAppContext } from '../../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

export default function Navbar() {

    const { isLoggedIn, setIsLoggedIn, userName, setUserName } = useAppContext();
    const navigate = useNavigate();
    useEffect(() => {
        const authTokenFromSession = sessionStorage.getItem('auth-token');
        const nameFromSession = sessionStorage.getItem('name');
        if (authTokenFromSession) {
            if (isLoggedIn && nameFromSession) {
                setUserName(nameFromSession);
            } else {
                sessionStorage.removeItem('auth-token');
                sessionStorage.removeItem('name');
                sessionStorage.removeItem('email');
                setIsLoggedIn(false);
            }
        }
    }, [isLoggedIn, setIsLoggedIn, setUserName])
    const handleLogout = () => {
        sessionStorage.removeItem('auth-token');
        sessionStorage.removeItem('name');
        sessionStorage.removeItem('email');
        setIsLoggedIn(false);
        navigate(`/app`);
    }
    const profileSecton = () => {
        navigate(`/app/profile`);
    }
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <a className="navbar-brand" href="/">GiftLink</a>

            <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <a className="nav-link" href="/home.html">Home</a> {/* Link to home.html */}
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/app">Gifts</Link> {/* Updated Link */}
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/app/search">Search</Link>
                    </li>
                    <ul className="navbar-nav ml-auto">
                        {isLoggedIn ? (
                            <>
                                <li className="nav-item"> <span className="nav-link" style={{ color: "black", cursor: "pointer" }} onClick={profileSecton}>Welcome, {userName}</span> </li>
                                <li className="nav-item"><button className="nav-link login-btn" onClick={handleLogout}>Logout</button></li>
                            </>
                        ) : (
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link login-btn" to="/app/login">Login</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link register-btn" to="/app/register">Register</Link>
                                </li>
                            </>
                        )
                        }
                    </ul>
                </ul>
            </div>
        </nav>
    );
}
