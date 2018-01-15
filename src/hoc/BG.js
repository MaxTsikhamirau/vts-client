import React from 'react';

const bg = ({ children, color }) =>
    <div style={{ backgroundColor: `${color}` }} >{children}</div>;

const bg2 = (WrappedComponent, color) => props =>
    (<div style={{ backgroundColor: `${color}` }} >
        <WrappedComponent {...props} />
    </div>);

const bg3 = (color) =>
    (WrappedComponent) => props =>
        (<div style={{ backgroundColor: `${color}` }} >
            <WrappedComponent {...props} />
        </div>);

export default bg3;