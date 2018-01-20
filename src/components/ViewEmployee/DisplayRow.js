import React from 'react';
import { FormGroup, Col } from 'react-bootstrap';

const displayRow = ({ label, children }) => (
    <FormGroup>
        <Col sm={4} >
            <span style={{ fontWeight: 'bold' }}>
                {label}
            </span>
        </Col>
        <Col sm={8}>{children}</Col>
    </FormGroup>
);

export default displayRow;
