import React from 'react';
import PropTypes from 'prop-types';
import { Container } from './styled';

import SideBarNav from '../sidebarNavs/SidebarNav';

// test
const items = [
  { label: '홈', href: '/' },
  { label: '게시판', href: '/boards' },
];

function SideBar(props) {
  const {
    className,
  } = props;

  return (
    <Container className={className}>
      SideBar
      <SideBarNav items={items} />
    </Container>
  );
}

SideBar.propTypes = {
  className: PropTypes.string,
};

SideBar.defaultProps = {
  className: '',
};

export default SideBar;
