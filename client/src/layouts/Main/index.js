import { Outlet } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Container, GlobalStyle } from './styled';

import Header from '../../components/headers/Header';
import Section from '../../components/sections/Section';
import Footer from '../../components/footers/Footer';
import Sidebar from '../../components/sidebars/Sidebar';

function Main(props) {
  const {
    className,
  } = props;

  return (
    <Container className={className}>
      <GlobalStyle />
      <Header />
      <Sidebar />
      <Section>
        <Outlet />
      </Section>
      <Footer />
    </Container>
  );
}

Main.propTypes = {
  className: PropTypes.string,
};

Main.defaultProps = {
  className: '',
};

export default Main;
