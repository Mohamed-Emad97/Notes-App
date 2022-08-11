import React from 'react';
import {Link} from "react-router-dom";

export default function Navbar(props) {
  return (
    <>
      <header>
        <nav className="navbar navbar-expand-lg">
          <div className="container">
            <Link className="navbar-brand fs-3 link" to="home">Notes</Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                {props.userData? <li className="nav-item">
                  <span onClick={props.logOut} className="nav-link link">Logout</span>
                </li> : <>
                    <li className="nav-item">
                      <Link className="nav-link link" to="login">Login</Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link link" to="register">Register</Link>
                    </li>
                </>}
              </ul>
            </div>
          </div>
        </nav>
      </header>
    </>
  )
}
