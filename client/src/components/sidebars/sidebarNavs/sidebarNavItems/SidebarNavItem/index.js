import React from 'react';
import PropTypes from 'prop-types';
import {ListItem} from './styled';

import { NavLink } from 'react-router-dom';


const SideBarNavItem = props => {
  const {
    className,
    label,
    href,
  } = props;
  
  return (
    <ListItem className={ className }>
      <NavLink to={ href }>
        { label }
      </NavLink>
    </ListItem>
  );
}
  
SideBarNavItem.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string,
  href: PropTypes.string,
}
  

export default SideBarNavItem;