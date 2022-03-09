import React from 'react';
import PropTypes from 'prop-types';
import {List} from './styled';

import SideBarNavItem from '../sidebarNavItems/SidebarNavItem';

const SideBarNav = props => {
  const {
    className,
    items,
  } = props;
  
  return (
    <List className={ className }>
      {
        items && items.map((opt, idx)=>(
          <SideBarNavItem key={ idx } { ...opt }/>
        ))
      }
    </List>
  );
}

SideBarNav.propTypes = {
  className: PropTypes.string,
  items: PropTypes.array,
}

export default SideBarNav;