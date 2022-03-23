import React from 'react';
import PropTypes from 'prop-types';
import { Container } from './styled';

function Footer(props) {
  const {
    className,
  } = props;

  return (
    <Container className={className}>
      Footer
    </Container>
  );
}

Footer.propTypes = {
  className: PropTypes.string,
};

Footer.defaultProps = {
  className: '',
};

export default Footer;
