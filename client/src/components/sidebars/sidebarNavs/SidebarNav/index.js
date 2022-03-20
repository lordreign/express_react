import React from 'react';
import PropTypes from 'prop-types';
import { List } from './styled';

import SideBarNavItem from '../sidebarNavItems/SidebarNavItem';

function SideBarNav(props) {
  const {
    className,
    items,
  } = props;

  return (
    <List className={className}>
      {
        items && items.map((opt) => (
          <SideBarNavItem key={opt.label} {...opt} />
        ))
      }
    </List>
  );
}

SideBarNav.propTypes = {
  className: PropTypes.string,
  items: PropTypes.array,
};

SideBarNav.defaultProps = {
  className: '',
  items: [],
};

export default SideBarNav;
