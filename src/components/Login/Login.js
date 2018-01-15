import React from 'react';
import { Button, Panel } from 'react-bootstrap';
import { connect } from 'react-redux';

import { login, logout } from '../../functions/loginFunctions';

class Login extends React.Component {

    state = {
      email: '',
      password: '',
    }

    handleInput = (event) => {
      this.setState({ [event.target.name]: event.target.value });
    }

    render() {
        return (
          <Panel header="Login">
            Email: <input type="text" name="email" onChange={this.handleInput} /><br/>
            Password: <input type="password" name="password" onChange={this.handleInput} /><br/>
            <Button bsStyle="primary" onClick={
              () => login(this.state.email, this.state.password)
            }>Login</Button>
            <Button bsStyle="danger" onClick={
              () => logout()
            }>Logout</Button>
          </Panel>
        );
    }
};

export default Login;
