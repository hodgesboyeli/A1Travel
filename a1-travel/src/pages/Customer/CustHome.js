import React from 'react';
import Navbar from "../../Navbars/Navbar";
import { Link } from "react-router-dom";

export default function CustHome() {
    return (
        <div>
            <Navbar />
            <div className="mt-5" style={{ paddingTop: 50 }}>
                <div className="container-fluid d-flex justify-content-center mt-5 mb-3">
                    <h1>May your journey begin</h1>
                </div>
                <div className="row justify-content-center">
                    <div className="col-md-4 text-center">
                        <Link to="/budget" className='m-2' state={{ from: 'trip' }}>
                            <button type="submit" className="btn btn-md custom-button" style={{ fontSize: 32 }}>
                                Book a Trip
                                <div><i className="fas fa-earth-africa"></i></div>
                            </button>
                        </Link>
                    </div>
                </div>
                <div className="row justify-content-center" style={{ paddingTop: 40 }}>
                    <div className="col-md-2 text-center">
                        <Link to="/budget" className='m-2' state={{ from: 'fly' }}>
                            <button type="submit" className="btn btn-md custom2-button" style={{ fontSize: 20, backgroundColor: "#1E71EE", paddingBottom: "10px" }}>
                                Book Flight <i className="fas fa-plane" style={{ paddingLeft: 10 }}></i>
                            </button>
                        </Link>
                    </div>
                    <div className="col-md-2 text-center">
                        <Link to="/budget" className='m-2' state={{ from: 'train' }}>
                            <button type="submit" className="btn btn-md custom2-button" style={{ fontSize: 20, backgroundColor: "#F9A602", paddingTop: "10px", paddingBottom: "10px" }}>
                                Book Train <i className="fas fa-train" style={{ paddingLeft: 10 }}></i>
                            </button>
                        </Link>
                    </div>
                    <div className="col-md-2 text-center">
                        <Link to="/budget" className='m-2' state={{ from: 'car' }}>
                            <button type="submit" className="btn btn-md custom2-button" style={{ fontSize: 20, backgroundColor: "#50C878", paddingBottom: "10px" }}>
                                Rent Car <i className="fas fa-car" style={{ paddingLeft: 10 }}></i>
                            </button>
                        </Link>
                    </div>
                </div>
                <div className="row justify-content-center" style={{ paddingTop: 40 }}>
                    <div className="col-md-2 text-center">
                        <Link to="/budget" className='m-2' state={{ from: 'lodging' }}>
                            <button type="submit" className="btn btn-md custom2-button" style={{ fontSize: 20, backgroundColor: "#ED2939", paddingBottom: "10px" }}>
                                Book Lodging <i className="fas fa-hotel" style={{ paddingLeft: 10 }}></i>
                            </button>
                        </Link>
                    </div>
                    <div className="col-md-2 text-center">
                        <Link to="/budget" className='m-2' state={{ from: 'event' }}>
                            <button type="submit" className="btn btn-md custom2-button" style={{ fontSize: 20, backgroundColor: "#8F00FF", paddingBottom: "10px" }}>
                                Book Event <i className="fas fa-ticket" style={{ paddingLeft: 10 }}></i>
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
