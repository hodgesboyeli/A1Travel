import React, { useRef, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import axios from 'axios';
import { Modal } from 'bootstrap';

export default function Login() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const auth = getAuth();
    const modalRef = useRef(null);

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            setError('');
            setLoading(true);

            await signInWithEmailAndPassword(auth, emailRef.current.value, passwordRef.current.value);

            try {
                const response = await axios.get(`http://localhost:8080/api/user/email/${emailRef.current.value}`);
                if (response.status === 404) throw response.statusText;

                const fetchedUser = response.data;

                if (fetchedUser.email !== emailRef.current.value) throw 'Invalid Credentials';

                if (!fetchedUser.isActive) throw 'User is Deactivated or Paused';

                sessionStorage.clear();
                sessionStorage.setItem('role', fetchedUser.role);

                if (sessionStorage.getItem('role') === "Customer") {
                    navigate('/home');
                } else if (sessionStorage.getItem('role') === "Administrator") {
                    navigate('/admin-home');
                } else if (sessionStorage.getItem('role') === "Travel Administrator") {
                    navigate('/ta-home/');
                } else {
                    console.log("Invalid user role value, returning to login.")
                    navigate('/login');
                }
            } catch (err) {
                console.log(err);
                setError('Invalid email or password');
                showModal();
            }

        } catch {
            setError('Invalid Email or Password. Please Try again.');
            showModal();
        } finally {
            setLoading(false);
        }
    }

    const showModal = () => {
        if (modalRef.current) {
            const modal = new Modal(modalRef.current);
            modal.show();
        }
    };

    const handleCloseModal = () => {
        if (modalRef.current) {
            const modal = Modal.getInstance(modalRef.current);
            if (modal) {
                modal.hide();
            }
        }
    };

    useEffect(() => {
        return () => {
            handleCloseModal();
        };
    }, []);

    return (
        <div className="page-style">
            <div className="container justify-content-center">
                <div className="container-fluid d-flex justify-content-center">
                    <p className="brand-name h2 mb-3" style={{ color: '#FF6C37', paddingTop: 55 }}>
                        A1 TRAVEL
                    </p>
                </div>
                <div className="text-center mt-3">
                    <img src={`${process.env.PUBLIC_URL}/A1Logo.png`} className="img-fluid" alt="A1 Travel Logo" />
                </div>
                <div className="container-fluid d-flex justify-content-center">
                    <p className="h2" style={{ color: 'white', paddingTop: 55 }}>
                        LOGIN
                    </p>
                </div>
            </div>

            <div className="signin-form-movement container-fluid d-flex justify-content-center">
                <form className="w-25 row" onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <input type="email" className="form-control" id="email" placeholder="EMAIL" ref={emailRef} />
                    </div>
                    <div className="mb-3">
                        <input type="password" className="form-control" id="password" placeholder="PASSWORD" ref={passwordRef} />
                    </div>
                    <div className="text-center" style={{ marginTop: 40 }}>
                        <button disabled={loading} type="submit" className="btn btn-sm custom-button">
                            SIGN IN
                        </button>
                    </div>
                    <div className="text-center mt-4">
                        <Link to="/signup">CREATE AN ACCOUNT</Link>
                    </div>
                </form>

                <div className="modal fade" ref={modalRef} tabIndex="-1" aria-labelledby="errorModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="errorModalLabel">
                                    Error
                                </h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">{error && <p>{error}</p>}</div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
