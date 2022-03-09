import React from 'react';
import PropTypes from 'prop-types';
import {Container} from './styled';

function Header(props) {
    const {
        className,
    } = props;

    return (
        <Container className={ className }>
            Header
        </Container>
    );
}

Header.propTypes = {
    className: PropTypes.string,
}

export default Header;