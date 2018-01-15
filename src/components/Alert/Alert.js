import React from 'react';
import { Alert } from 'react-bootstrap';
import { connect } from 'react-redux';

import { clearAlertAction } from '../../reducers/alertActions';

const alert = (props) => {
    const alert = props.alert;
    return (
        alert.message 
        ?   <Alert bsStyle={alert.type} style={{ marginBottom: '5px' }} onClick={() => props.dispatch(clearAlertAction())}>
                {alert.message}
            </Alert>
        :   null
    );
}

export default connect((store) => ({ alert: store.alert }))(alert);