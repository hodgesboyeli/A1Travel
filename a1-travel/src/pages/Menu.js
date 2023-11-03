import React from 'react';

export default function Menu(){
    return (
        <div className="header">
            <nav className="navbar navbar-expand-lg">
                <a className="navbar-brand mr-auto" href="#">A1 Travel</a>
                {/*<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">*/}
                {/*    <span className="navbar-toggler-icon"></span>*/}
                {/*</button>*/}
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar">
                        <li className="nav-item active">
                            <a className="nav-link px-3 py-2" href="#">Home <span className="sr-only">(current)</span></a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link px-3 py-2" href="#">Past Bookings</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link px-3 py-2" href="#">Support</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link px-3 py-2" href="#">Profile</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link px-3 py-2" href="#">Settings</a>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    )
}