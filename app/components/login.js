var React = require("react");

class Login extends React.Component {
    constructor() {
        this.state = { username: '', password: '' };
    }

    onUsernameChange() {
        this.setState({ username: event.target.value });
    }

    onPasswordChange(){
        this.setState({ password: event.target.value });
    }

    render() {
        var username = this.state.username,
            password = this.state.password;

        return (<div className='container'>
                  <div className='login'>
                    <h1>Glitchr</h1>
                    <input type='text' value={username} placeholder='username'
                      onChange={this.onUsernameChange} />
                    <input type='password' value={password} placeholder='password'
                      onChange={this.onPasswordChange}/>
                  </div>
                </div>);
    }
}

module.exports = Login;
