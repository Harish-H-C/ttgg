import React from 'react';
import Header from './Header';
import {Link} from 'react-router-dom';
import './Register.css';
import { Component } from 'react';

function ValidationMessage(props) {
    if(!props.valid){
        return(<div className="error-msg">{props.msg}</div>)
    }else {
        return null;
    }
}

const url="http://localhost:8900/signin"

class Register extends Component {
    constructor(){
        super()
        this.state={
            username: "",usernameValid:false,
            email:"",emailValid:false,
            password: "",passwordValid:false,
            formValid:false,
            error:{}
        }
    }

    ValidateForm = () => {
        const {usernameValid,emailValid,passwordValid,passwordConfirmationValid} = this.state;
        this.setState({
            formValid:usernameValid && emailValid && passwordValid && passwordConfirmationValid
        })
    }

    updateUsername = (username) => {
        this.setState({username:username},this.validateUsername)
    }

    validateUsername = () => {
        const{username} = this.state;
        let usernameValid = true;
        let error = {...this.state.error}

        if(username.length < 3)
        {
            usernameValid = false;
            error.username = "username must be greater than 3 character"
        }

        this.setState({usernameValid, error}, this.validateForm)
    }

    updateEmail = (email) => {
        this.setState({email},this.validateEmail)
    }

    validateEmail = () => {
        const{email} = this.state;
        let emailValid = true;
        let error = {...this.state.error}

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){
            emailValid = false;
            error.email = "Invalid email Format"
        }
        this.setState({emailValid, error}, this.validateForm)
    }

    updatePassword = (password) => {
        this.setState({password},this.validatePassword);
    }

    validatePassword = () => {
        const{password} = this.state;
        let passwordValid = true;
        let error = {...this.state.error}
        
        if (password.length < 6){
            passwordValid = false;
            error.password = "Password must be at least 6 characters"
        } else if (!/\d/.test(password)){
            passwordValid = false;
            error.password = "Password must be 6 digits"
        } else if (!/[!@#$%^&*]/.test(password)){
            passwordValid = false;
            error.password = "Password must contain Special Characters"
        }
        this.setState({passwordValid, error}, this.validateForm)
    }



    handleChangeUsername = (event) => {
        this.setState({username:event.target.value})
    }

    handleChangeEmail = (event) => {
        this.setState({email:event.target.value})
    }

    handleChangePassword = (event) => {
        this.setState({password:event.target.value})
    }

    handleContinue = () => {
        console.log(this.state)

        if (this.state.email !== "" && this.state.password !== "" && this.state.username !== "" && this.state.passwordConfirmation !== "" ){//if email and password is not enterd then don't allow to dashboard page
        this.props.history.push('/')
            }
        fetch(url, {
            method: 'POST',
            headers: {
                'Accept':'application/json',
                'Content-Type':'application/json' 
            },
            body:JSON.stringify(this.state)
        })
        // this.props.history.push('/')
        
    }

    render(){
        return(
            <div>
                <Header/>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-2">
                            <h2>Sign Up</h2>
                            <br/>
                            <br/>

                            <main role="main">
                            <form action="#" id='js-form'>
                            <ValidationMessage  valid={this.state.usernameValid} msg={this.state.error.username}/>
                            <label>User Name</label>
                            <input className="form-control" type="text" placeholder="" id="username" value={this.state.username} onChange={(e)=>this.updateUsername(e.target.value)} onChange1={this.handleChangeUsername} required></input>

                            <ValidationMessage  valid={this.state.emailValid} msg={this.state.error.email}/>
                            <label>Email</label>
                            <input className="form-control" type="text" placeholder="" id="email" value={this.state.email} onChange={(e)=>this.updateEmail(e.target.value)} onChange1={this.handleChangeEmail} required></input>  

                            <ValidationMessage  valid={this.state.passwordValid} msg={this.state.error.password}/>
                            <label>Password</label>
                            <input className="form-control" type="text" placeholder="" id="password" value={this.state.password} onChange={(e)=>this.updatePassword(e.target.value)} onChange1={this.handleChangePassword} required></input>    

                            <br/>
                            <button type="submit" className="btn btn-primary" disable={!this.state.formValid} onClick={this.handleContinue}>Sign Up</button>
                            </form>
                            </main>
                            <div className="p-sm-2"></div>
                            <p>Already Have an Account?
                            <br/>
                            <Link to="/">Sign In</Link></p>
                        </div>
                        <div className="p-sm-3"></div>
                        <div className="vl"></div>
                        <div className="col-lg-8">
                            <img src="https://e2k9ube.cloudimg.io/s/cdn/x/https://edienet.s3.amazonaws.com/news/images/full_39933.jpg?v=03/03/2020%2009:41:00" alt="" class="img-fluid"/>
                        </div> 
                    </div>
                </div>
                
            </div>
        )
    }
}

export default Register;