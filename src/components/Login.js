import React from 'react';
import '../assets/css/Login.css';
import {Link} from 'react-router-dom';
import withFirebaseAuth from 'react-with-firebase-auth';
import * as firebase from 'firebase/app';
import 'firebase/auth';

const firebaseAppAuth = firebase.auth();

const providers = {
    googleProvider : new firebase.auth.GoogleAuthProvider(),
    facebookProvider : new firebase.auth.FacebookAuthProvider(),
};

function createUser(user){
	let userOut = {
		id:user.uid,
		name:user.displayName,
		photo:user.photoURL
	}
	window.localStorage.setItem('user',JSON.stringify(userOut));
}

function exitUser(){
	window.localStorage.removeItem('user');
}

function Login(props){
	const { user, signOut, signInWithGoogle, signInWithFacebook } = props;
	if(user != null){createUser(user)}
	else {exitUser()}
	return (
		<div className="container">
			{user ? <p>hola {user.displayName}</p> : <p>Porfavor ingresa</p>}
			<div className="titles mt-3 mb-3">Please login with...</div>
			<div id="buttons" className="row p-0 m-0">
				<div className="col-4">
					<button onClick={signInWithFacebook} className="btnf btn btn-lg btn-block" data-toggle="tooltip" data-placement="top" title="Facebook">
						<i className="fab fa-facebook-f fa-2x"></i>
						<span className="hidden-xs"></span>
					</button>
				</div>
				<div className="col-4">
					<a href="/" className="btnt btn btn-lg btn-block kpx_btn-twitter" data-toggle="tooltip" data-placement="top" title="Twitter">
						<i className="fab fa-twitter fa-2x"></i>
						<span className="hidden-xs"></span>
					</a>
				</div>  
				<div className="col-4">
					<button onClick={signInWithGoogle} className="btng btn btn-lg btn-block kpx_btn-google-plus" data-toggle="tooltip" data-placement="top" title="Google Plus">
						<i className="fab fa-google fa-2x"></i>
						<span className="hidden-xs"></span>
					</button>
				</div>  
    	</div>
			<div className="titles mt-3">... or ...</div>
			<form className="m-0">
				<div className="container">
					<div className="form-group m-0">
    			<label htmlFor="email"></label>
    			<input type="email" className="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email" />
  			</div>
  			<div className="form-group m-0">
    			<label htmlFor="password"></label>
    			<input type="password" className="form-control" id="password" placeholder="Password" />
  			</div>
  			<button type="submit" className="btn btn-primary mt-4">Log In</button>
				</div>
				<div className="titles mt-3">You have not yet registered?</div>
  			<div className="container">
					<Link to='/register'><button type="submit" className="btn btn-primary mt-4">Register</button></Link>
				</div>
			</form>
			<button onClick={signOut} className="btn btn-primary mt-4">signOut</button>
		 </div>
	)

}

export default withFirebaseAuth({
	providers,
	firebaseAppAuth,
})(Login);
