import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';


const EntityListFieldHeader = (props) => {
  const { fieldName, fieldDesc, onClick, sorting, filterable } = props;
  const sortOrder = 'sort-' + sorting;
  const classes = classNames({
    filterable,
    sortable: fieldDesc.sortable,
    [sortOrder]: sorting
  });
  const title = fieldDesc.sortable ?
    <a href='#' className={classes} data-key={fieldName} onClick={onClick}>{fieldDesc.title}</a> :
    <div className={classes}>{fieldDesc.title}</div>;
  return (
    <th data-field={fieldName}>
      {title}
    </th>
  ); 
};

EntityListFieldHeader.propTypes = {
  fieldName: PropTypes.string.isRequired,
  fieldDesc: PropTypes.object.isRequired,
  sorting: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
  ]).isRequired,
  filterable: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default EntityListFieldHeader;