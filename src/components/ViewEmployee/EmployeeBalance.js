import React from 'react';
import { Panel } from 'react-bootstrap';

import DisplayRow from './DisplayRow';

const employeeBalance = ({ employee }) => {
  return (
    <Panel header="Balance">
        <DisplayRow label="Working since">
            {employee.startDateFormatted}
        </DisplayRow>
        <DisplayRow label="Days per year">
            {20}
        </DisplayRow>
        <div className="gigantic">{employee.balanceFormatted}</div>
    </Panel>);
};

export default employeeBalance;
