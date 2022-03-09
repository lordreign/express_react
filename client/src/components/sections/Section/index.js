import React from 'react';
import PropTypes from 'prop-types';
import {Container, Wrapper} from './styled';

function Section(props) {
    const {
        className,
        children,
    } = props;
    
    return (
        <Container className={ className }>
            <Wrapper>
                { children }
            </Wrapper>
        </Container>
    );
}

Section.propTypes = {
    className: PropTypes.string,
    children: PropTypes.node,
}

export default Section;