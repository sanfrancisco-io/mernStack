import React from 'react';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';
import useLogout from '../hooks/useLogout';

const Navbar = () => {
    const { logout } = useLogout();
    const { user } = useAuthContext();

    const handleLogout = () => {
        logout();
    };

    return (
        <header>
            <div className='container'>
                <Link to={'/'}>
                    <h1>Workout body</h1>
                </Link>
                <nav>
                    {user ? (
                        <div>
                            <span style={{ marginRight: '20px' }}>
                                {user.email}
                            </span>
                            <button onClick={handleLogout}>Log out</button>
                        </div>
                    ) : (
                        <div>
                            <Link to={'/login'}>Log in</Link>
                            <Link to={'/signup'}>Sign up</Link>
                        </div>
                    )}
                </nav>
            </div>
        </header>
    );
};

export default Navbar;