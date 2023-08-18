import React from 'react';

import PropTypes from 'prop-types';
import {SorttypesTypes} from '../../prop-types/sorttypes-types';

const Sort = ({sortTypes, activeSortType, onClick}) => {

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by</span>
      <span className="places__sorting-type" tabIndex="0">
        Popular
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul className="places__options places__options--custom places__options--opened">
        {sortTypes.map((type) => {
          return (<li key={type}
            className={`places__option ${type === activeSortType ? `places__option--active` : ``}`}
            tabIndex="0" onClick={() => onClick(type)}>{type}</li>);
        })}
      </ul>
    </form>
  );
};

Sort.propTypes = {
  sortTypes: SorttypesTypes,
  activeSortType: PropTypes.string,
  onClick: PropTypes.func,
};

export default Sort;
