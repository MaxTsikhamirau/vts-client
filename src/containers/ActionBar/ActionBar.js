import React from 'react';
import { Form, FormGroup } from 'react-bootstrap';

const actionBar = (props) => (
    <Form inline style={{ marginBottom: '5px' }} >
        <FormGroup>
            {props.left}
        </FormGroup>
        {' '}
        <FormGroup>
            {props.right}
        </FormGroup>
    </Form>
);

export default actionBar;