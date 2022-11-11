import React, { useEffect, useState } from 'react';
import { useSignup } from '../hooks/useSignup';

const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { signup, isLoading, error, success } = useSignup();

    const [valid, setValid] = useState({
        isUpperCase: false,
        isLowerCase: false,
        isNumbers: false,
        isSybmols: false,
        passLength: 0,
    });

    const changeValidation = (string) => {
        const isUpperCase = () => /[A-Z]/.test(string);
        const isLowerCase = () => /[a-z]/.test(string);
        const isHaveNumbers = () => /\d/.test(string);
        const isHaveSymbols = () => /[^\w\s]/.test(string);

        setValid({
            isUpperCase: isUpperCase(),
            isLowerCase: isLowerCase(),
            isNumbers: isHaveNumbers(),
            isSybmols: isHaveSymbols(),
            passLength: password.length,
        });
    };

    useEffect(() => {
        changeValidation(password);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [password]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        await signup(email, password);
    };

    return (
        <form className='signup' onSubmit={handleSubmit}>
            <h3>Sign up</h3>

            <label>Email :</label>
            <input
                value={email}
                type='email'
                onChange={(e) => setEmail(e.target.value)}
            />

            <label>Password :</label>
            <input
                value={password}
                type='password'
                onChange={(e) => setPassword(e.target.value)}
            />

            <div
                style={{
                    textAlign: 'center',
                }}
                className='passwordValidation'
            >
                <p className={valid.passLength >= 8 ? 'success' : 'error'}>
                    Пароль должен состоять больше из 8 символов
                </p>
                <p className={valid.isLowerCase ? 'success' : 'error'}>
                    Пароль должен состоять из маленьких букв
                </p>
                <p className={valid.isUpperCase ? 'success' : 'error'}>
                    Пароль должен состоять из больших букв
                </p>
                <p className={valid.isSybmols ? 'success' : 'error'}>
                    Пароль должен состоять из сивмолов
                </p>
                <p className={valid.isNumbers ? 'success' : 'error'}>
                    Пароль должен состоять из цифр
                </p>
            </div>

            <button disabled={isLoading} type='submit'>
                Sign up
            </button>
            {success && (
                <div className='successAuth'>
                    {'user successfully registered'}
                </div>
            )}
            {error && <div className='error'>{error}</div>}
        </form>
    );
};

export default Signup;
