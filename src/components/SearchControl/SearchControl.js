import React from 'react';
import { FormGroup, InputGroup, FormControl, Button } from 'react-bootstrap';

const searchControl = (props) => {
    return (
        <FormGroup>
            <InputGroup>
                <FormControl type="text" placeholder="search..." onChange={props.changed} value={props.text} />
                <InputGroup.Button>
                    <Button bsStyle="primary" onClick={props.canceled}>Clear</Button>
                </InputGroup.Button>
            </InputGroup>
        </FormGroup>
    );
}

export default searchControl;