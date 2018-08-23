import React from 'react';
import { array, func } from 'prop-types';

import Header from './Header';
import MapComponent from './MapComponent';
import ErrorBoundary from './ErrorBoundary';
import './Main.css';

Main.propTypes = {
  parks: array.isRequired,
  onParkClick: func.isRequired,
  onToggleInfo: func.isRequired,
  toggleDrawer: func.isRequired
};

function Main(props) {
  return (
    <main>
      <Header toggleDrawer={props.toggleDrawer}/>
      <ErrorBoundary>
        <MapComponent
          markers={props.parks}
          onParkClick={props.onParkClick}
          onToggleInfo={props.onToggleInfo}
        />
      </ErrorBoundary>
    </main>
  );
}

export default Main;