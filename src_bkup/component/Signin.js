import React from 'react';
import Header from './Header';
import Footer from './Footer'
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

class Signin extends Component {
    constructor(){
        super()
        this.state={
            username: "",usernameValid:false,
            password: "",passwordValid:false,
            formValid:false,
            error:{}
        }
    }

    ValidateForm = () => {
        const {usernameValid,passwordValid} = this.state;
        this.setState({
            formValid:usernameValid && passwordValid 
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

    updatePassword = (password) => {
        this.setState({password},this.validatePassword);
    }

    validatePassword = () => {
        const{password} = this.state;
        let passwordValid = true;
        let error = {...this.state.error}
        
        if (password.length < 5){
            passwordValid = false;
            error.password = "Password must be at least 5 characters"
        // } else if (!/\d/.test(password)){
        //     passwordValid = false;
        //     error.password = "Password must be 6 digits"
        // } else if (!/[!@#$%^&*]/.test(password)){
        //     passwordValid = false;
        //     error.password = "Password must contain Special Characters"
        }
        this.setState({passwordValid, error}, this.validateForm)
    }



    handleChangeUsername = (event) => {
        this.setState({username:event.target.value})
    }

    handleChangePassword = (event) => {
        this.setState({password:event.target.value})
    }

    handleContinue = () => { 
        console.log(this.state)

        if ((this.state.username === "" | this.state.username === "admin") 
        && (this.state.password === "" | this.state.username === "admin")){//if email and password is not enterd then don't allow to dashboard page
        this.props.history.push('/dashboard')
            }
        else{
            alert("Please enter valid username or password")
        }
        fetch(url, {
            method: 'POST',
            headers: {
                'Accept':'application/json',
                'Content-Type':'application/json' 
            },
            body:JSON.stringify(this.state)
        })
        // this.props.history.push('/dashboard')
        
    }

    render(){
        return(
            <div className="loginPage">
                <Header/>
                
                <div className="container-fluid">
                <div className="pb-3"/>
                {/* <div className="pb-3"/> */}
                    <div className="row">
                        
                        <div className="col-lg-3 col-md-4 col-sm-3">
                            <div id="midalignSignin">
                            <h2 className="htag">Sign In</h2>


                            <main role="main">
                            <form action="#" id='js-form'>


                            <ValidationMessage  valid={this.state.usernameValid} msg={this.state.error.username}/>
                            {/* <ValidationMessage  valid={'admin'} msg={this.state.error.username}/> */}
                            <form className="form-inline">
                            <label for="username">Username : </label>
            
                            {/* <input className="form-control" type="text" placeholder="admin" id="username" name="username" value={this.state.username} onChange={(e)=>this.updateUsername(e.target.value)} onChange1={this.handleChangeUsername} required></input>   */}
                            {/* <div className="pl-3"/> */}
                
                            <input style={{marginLeft:"6px",height:"30px",width:"60%",fontSize:"16px"}} className="form-control" type="text" placeholder="admin" id="username" name="username" value="admin" onChange={(e)=>this.updateUsername(e.target.value)} onChange1={this.handleChangeUsername} required></input>
                            </form>
                            <ValidationMessage  valid={this.state.passwordValid} msg={this.state.error.password}/>
                            {/* <ValidationMessage  valid={'admin'} msg={this.state.error.password}/> */}
                            <div className="pt-1"/>
                            <form className="form-inline">
                            <label for="password">Password &nbsp;: </label>
                            {/* <input className="form-control" type="text" placeholder="admin" id="password" name="password" value={this.state.password} onChange={(e)=>this.updatePassword(e.target.value)} onChange1={this.handleChangePassword} required></input>     */}
                            {/* <div className="pl-3"/> */}
                            <input  style={{marginLeft:"6px",height:"30px",width:"60%",fontSize:"16px"}} className="form-control" type="text" placeholder="admin" id="password" name="password" value="admin" onChange={(e)=>this.updatePassword(e.target.value)} onChange1={this.handleChangePassword} required></input>
                            </form>

                            <div className="pt-5"/>
                           
                            <button type="submit" className="btn2" disable={!this.state.formValid} onClick={this.handleContinue}>Sign In</button>
                            </form>
                            </main>
                            <div className="pb-5"/>
                            <br/>
                            {/* <div className="p-sm-2"></div>
                            <p>Don't Have an Account?
                            <br/>
                            <Link to="/register">Sign Up</Link></p> */}
                        </div>
                        </div>
                        {/* <div className="p-sm-3"></div>
                        <div className="vl"></div>*/}
                        <div className="col-lg-9 col-md-8 col-sm-9">
                            <div className="pb-4"/>
                            <img src="https://e2k9ube.cloudimg.io/s/cdn/x/https://edienet.s3.amazonaws.com/news/images/full_39933.jpg?v=03/03/2020%2009:41:00" alt="" className="img-fluid"/>
                            <div className="pb-3"/>
                            <div className="pb-5"/>
                        </div>  
                    </div>
                </div>
                <Footer/>
                
            </div>
        )
    }
}

export default Signin;