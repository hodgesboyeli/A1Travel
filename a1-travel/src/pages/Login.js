import React from 'react';

export default function Login(){
    return (
        <div className="container-fluid">
            <form className="row justify-content-center">
                <div className="mb-3 w-25 col">
                    <label for='inputEmail' className='form-label'>
                        Email
                    </label>
                    <input type='email' className='form-control' id="inputEmail" />
                </div>
                <div className="mb-3 w-25 col">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" className="form-control" id="exampleInputPassword1"/>
                </div>
            </form>
        </div>
);
}