import React from 'react';
import AdminNavbar from "../AdminNavbar";

export default function UserSearch() {
    return (
        <div>
            <AdminNavbar />
            <div className="container-fluid d-flex justify-content-center mt-5 mb-3">
                <h1>User Search</h1>
            </div>
            <div className="container-fluid d-flex justify-content-center">
                <form className="row g-3">
                    <div className="col-md-6">
                        <label htmlFor="inputFirstName" className="form-label">First Name</label>
                        <input type="text" className="form-control" id="inputFirstName" />
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="inputLastName" className="form-label">Last Name</label>
                        <input type="text" className="form-control" id="inputLastName" />
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="inputUsername" className="form-label">Username</label>
                        <input type="text" className="form-control" id="inputUsername" />
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="inputEmail" className="form-label">Email</label>
                        <input type="email" className="form-control" id="inputEmail" />
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="inputID" className="form-label">ID</label>
                        <input type="text" className="form-control" id="inputID" />
                    </div>
                    <div className="col-12 d-flex justify-content-center">
                        <button type="submit" className="btn btn-primary">Search</button>
                    </div>
                </form>
            </div>
        </div>
    );
}
