import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './signin.css';

function ValidationMessage(props) {
  if (!props.valid) {
    return (<div className="error-msg">{props.msg}</div>)
  } else {
    return null;
  }
}

const url = "http://localhost:8900/signin"

class Signin extends Component {
  constructor() {
    super()
    this.state = {
      username: "", usernameValid: false,
      password: "", passwordValid: false,
      formValid: false,
      error: {}
    }
  }

  ValidateForm = () => {
    const { usernameValid, passwordValid } = this.state;
    this.setState({
      formValid: usernameValid && passwordValid
    })
  }


  updateUsername = (username) => {
    this.setState({ username: username }, this.validateUsername)
  }

  validateUsername = () => {
    const { username } = this.state;
    let usernameValid = true;
    let error = { ...this.state.error }

    if (username.length < 3) {
      usernameValid = false;
      error.username = "username must be greater than 3 character"
    }

    this.setState({ usernameValid, error }, this.validateForm)
  }

  updatePassword = (password) => {
    this.setState({ password }, this.validatePassword);
  }

  validatePassword = () => {
    const { password } = this.state;
    let passwordValid = true;
    let error = { ...this.state.error }

    if (password.length < 5) {
      passwordValid = false;
      error.password = "Password must be at least 5 characters"
      // } else if (!/\d/.test(password)){
      //     passwordValid = false;
      //     error.password = "Password must be 6 digits"
      // } else if (!/[!@#$%^&*]/.test(password)){
      //     passwordValid = false;
      //     error.password = "Password must contain Special Characters"
    }
    this.setState({ passwordValid, error }, this.validateForm)
  }



  handleChangeUsername = (event) => {
    this.setState({ username: event.target.value })
  }

  handleChangePassword = (event) => {
    this.setState({ password: event.target.value })
  }

  handleContinue = () => {
    console.log(this.state)

    if ((this.state.username === "" | this.state.username === "admin")
      && (this.state.password === "" | this.state.username === "admin")) {//if email and password is not enterd then don't allow to dashboard page
      this.props.history.push('/dashboard')
    }
    else {
      alert("Please enter valid username or password")
    }
    fetch(url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state)
    })
    // this.props.history.push('/dashboard')
  }


  render() {
    return (
      <div className="body1">
        <div class="container-fluid px-1 px-md-5 px-lg-1 px-xl-5 py-5 mx-auto">
          <div class="card card0 border-0">
            <div class="row d-flex  changeBack">
              <div class="col-lg-6 col-md-6">
                <div class="card1 pb-4 pt-3">
                  <div class="row px-5 justify-content-center mt-3 mb-3"><img src="../images/Final_image.jpg" class="image" /></div>
                  {/* <div class="row px-3 justify-content-center mt-4 mb-5 border-line"> <img src="../images/Final image.jpg" class="image"/> </div> */}
                </div>
              </div>
              <div class="col-lg-6 col-md-6 loginPart">
                <h2 style={{ marginTop: "5%", color: "teal" }}>iRMS</h2>
                <div className="pb-3" />
                <h5>Hi,</h5>
                <h5> Welcome to iRMS</h5>
                <br />
                {/* <div className="fieldset"> */}
                  {/* <h4 className="legend">Sign In</h4> */}
                  <main role="main">
                    <form action="#" id='js-form'>
                      <div className="form-group">
                        <ValidationMessage valid={this.state.usernameValid} msg={this.state.error.username} />
                        <label style={{ fontWeight: "500" }}>Username</label>
                        <input type="text" className="form-control" name="username" placeholder="admin" id="username" value="admin" onChange={(e) => this.updateUsername(e.target.value)} onChange1={this.handleChangeUsername} required></input>
                        <ValidationMessage valid={this.state.passwordValid} msg={this.state.error.password} />
                        <div className="pb-2" />
                        <label style={{ fontWeight: "500" }}>Password</label>
                        <input type="text" className="form-control" name="password" placeholder="admin" id="password" value="admin" onChange={(e) => this.updatePassword(e.target.value)} onChange1={this.handleChangePassword} required />
                        <div className="pt-4"></div>
                        <button type="submit" className="btn3" disable={!this.state.formValid} onClick={this.handleContinue}>Sign In</button>
                      </div>
                    </form>
                  </main>
                {/* </div> */}
                <img src="../images/TTBS.jpg" class="logoImg" />
              </div>
            </div>
          </div>
        </div>

      </div>
    )
  }
}

export default Signin;