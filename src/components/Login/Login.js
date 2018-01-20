import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import  { Button, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';
import { translate } from 'react-i18next';

import { login } from '../../functions/loginFunctions';
import { setNavLabelAction } from '../../reducers/navigation/navigationActions';

import './Login.css';

@translate('translations')
@connect()
class Login extends React.Component {

    state = {
      email: '',
      password: '',
    }

    componentDidMount = () => {
      this.props.dispatch(setNavLabelAction(this.props.t('navigation.label.login')));
    }

    handleInput = (event) => {
      this.setState({ [event.target.name]: event.target.value });
    }

    render() {
      const { t } = this.props;
      if (!window.localStorage.token) {
        return (
          <div className="Login" >
            <FormGroup>
                <ControlLabel>{t('login.email')}</ControlLabel>
                <FormControl type="text" name="email" onChange={this.handleInput} />
            </FormGroup>
            <FormGroup>
                <ControlLabel>{t('login.password')}</ControlLabel>
                <FormControl type="password" name="password" onChange={this.handleInput} />
            </FormGroup>
            <Button bsStyle="primary" onClick={ () => login(this.state.email, this.state.password) }>{t('login.login')}</Button>
          </div>
        );
      }
      return <Redirect to="/" />
    }
};

export default Login;
