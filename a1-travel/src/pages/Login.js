import React from 'react';

export default function Login(){
    return (
        <div>
        <div className="container-fluid">
            <form className="row justify-content-center">
                <div className="mb-3 w-25 col">
                    <label for='inputEmail' className='form-input'>
                        Email
                    </label>
                </div>
                <div className="mb-3 w-25 col">
                    <label htmlFor="exampleInputPassword1" className="form-input">Password</label>
                </div>
            </form>
        </div>
        </div>
);
}