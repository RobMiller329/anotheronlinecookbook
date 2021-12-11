import React from "react";

class LoginPage extends React.Component
{
    constructor(props)
    {
        super(props);

        this.state = 
        {
            details: {email: "", password: ""},
            login: this.props.login,
        };

        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.handleEmailInputChange = this.handleEmailInputChange.bind(this);
        this.handlePasswordInputChange = this.handlePasswordInputChange.bind(this);
    }

    handleFormSubmit(event)
    {
        event.preventDefault();

        this.state.login(this.state.details);
    }

    handleEmailInputChange(event)
    {   
        let updateDetails = {...this.state.details};
        updateDetails.email = event.target.value;
        
        this.setState(
        {
            details: updateDetails
        });
    }

    handlePasswordInputChange(event)
    {   
        let updateDetails = {...this.state.details};
        updateDetails.password = event.target.value;
        
        this.setState(
        {
            details: updateDetails
        });
    }

    render()
    {
        let email = this.state.details.email;
        let password = this.state.details.password;

        return (
            <div className="loginFormContainer">
                <form onSubmit={this.handleFormSubmit}>
                    <div className="loginFormLabels">
                        <label>Email:</label>
                    </div>
                    <div className="loginFormInputs">
                        <input type="text" id="loginEmailInput" placeholder="Please enter your email" value={email} onChange={this.handleEmailInputChange}></input>
                    </div>
                    <div className="loginFormLabels">
                        <label>Password:</label>
                    </div>
                    <div className="loginFormInputs">
                        <input type="password" id="loginPasswordInput" placeholder="Please enter your password" value={password} onChange={this.handlePasswordInputChange}></input>
                    </div>
                    <div className="loginFormButtons">
                        <input type="submit" id="loginSubmitButton" value="LOGIN"></input>
                    </div>
                </form>
            </div>
        );
    }
}

export default LoginPage;