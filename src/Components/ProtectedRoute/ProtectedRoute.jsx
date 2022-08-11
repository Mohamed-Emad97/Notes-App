import React from 'react';
import { Navigate } from 'react-router-dom';

export default function ProtectedRoute(props) {
    if (localStorage.getItem("Token") === null) {
        return <Navigate to="/login" />
      }else{
        return props.children;  //Children is Porperty In Props.
      }
}
