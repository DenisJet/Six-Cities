import React from 'react';

import PropTypes from 'prop-types';
import {CitiesTypes} from '../../prop-types/cities-types';


const CitiesList = ({cities, activeCity, onClick}) => {
  return (
    <ul className="locations__list tabs__list">
      {cities.map((city) => {
        return (<li key={city} className="locations__item">
          <a type="button" className={`locations__item-link tabs__item ${city === activeCity ? `tabs__item--active` : ``}`}
            onClick={() => onClick(city)}>
            <span>{city}</span>
          </a>
        </li>);
      })}
    </ul>
  );
};

CitiesList.propTypes = {
  cities: CitiesTypes,
  activeCity: PropTypes.string,
  onClick: PropTypes.func,
};

export default CitiesList;
