import React from 'react';
import { FormGroup, ControlLabel, FormControl } from 'react-bootstrap';

import './Input.css';

export default class Input extends React.Component {

    state = {
        validationState: null
    }

    handleChange = (event) => {
        const valid = this.props.validator(event.target.value);
        this.setState({ validationState: valid ? null : 'error '});
        this.props.changed(event);
     }

    render() {
        return (
            <FormGroup validationState={this.state.validationState}>
                <ControlLabel>{this.props.label}</ControlLabel>
                <FormControl type="text" name={this.props.name} value={this.props.value} onChange={this.handleChange} />
            </FormGroup>);
    }
};