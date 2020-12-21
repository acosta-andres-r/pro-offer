import React from 'react';

import AALogo from '../../assets/images/AA-logo.svg';
import classes from './Logo.module.css';

const logo = (props) => (
    <div className={classes.Logo} style={{height: props.height}}>
        <img src={AALogo} alt="Personal logo" />
    </div>
);

export default logo;