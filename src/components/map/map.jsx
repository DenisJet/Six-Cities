import React, {useEffect, useRef} from 'react';

import leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';

import PropTypes from 'prop-types';
import {OfferTypes} from '../../prop-types/offer-types';

const Map = ({offers, activeOffer}) => {
  const mapRef = useRef();

  useEffect(() => {
    const city = offers[0].city;
    mapRef.current = leaflet.map(`map`, {
      center: {
        lat: city.location.latitude,
        lng: city.location.longitude
      },
      zoom: city.location.zoom
    });

    leaflet.
      tileLayer(`https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png`, {
        attribution: `© OpenStreetMap contributors © CARTO`
      })
      .addTo(mapRef.current);


    return () => {
      mapRef.current.remove();
    };
  }, [mapRef, offers]);

  useEffect(() => {
    if (mapRef.current) {
      offers.forEach((offer) => {
        const isActive = activeOffer ? offer.id === activeOffer.id : false;
        const customIcon = leaflet.icon({
          iconUrl: isActive ? `img/pin-active.svg` : `img/pin.svg`,
          iconSize: [30, 30]
        });

        leaflet.marker({
          lat: offer.location.latitude,
          lng: offer.location.longitude
        },
        {
          icon: customIcon
        })
          .addTo(mapRef.current)
          .bindPopup(offer.title);
      });
    }
  }, [offers, activeOffer]);

  return (
    <div id="map" style={{height: `100%`}} ref={mapRef}/>
  );
};

Map.propTypes = {
  offers: PropTypes.arrayOf(OfferTypes),
  activeOffer: OfferTypes,
  className: PropTypes.string,
};

export default Map;
