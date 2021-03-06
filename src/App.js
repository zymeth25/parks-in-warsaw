import React, { Component } from 'react';

import FilterMenu from './FilterMenu';
import Main from './Main';
import Header from './Header';
import parks from './data';
import './App.css';

class App extends Component {
  state = {
    parks: parks,
    // Drawer menu state
    showDrawer: false
  }

  // Ref to an <input type="search"> in the Search Component
  searchField = React.createRef()

  onParkClick = (parkId) => {
    // Start animation
    this.setState((state) => ({
      parks: state.parks.map((park) => {
        // Close all other infowindows
        park.info = false;
        // Run animations and open the selected infowindow
        (park.id === parkId) &&
          (park.animate = true) &&
          (park.info = true);
        return park;
      }),
      // Also close drawer menu so that infowindows are visible
      showDrawer: false
    }), this.stopMarkerAnimation(parkId));
  }

  onToggleInfo = (parkId) => {
    this.setState((state) => ({
      parks: state.parks.map((park) => {
        (park.id === parkId) && (park.info = false);
        return park;
      })
    }), this.stopMarkerAnimation(parkId));
  }

  stopMarkerAnimation = (parkId) => {
    setTimeout(() => {
      this.setState((state) => ({
        parks: state.parks.map((park) => {
          (park.id === parkId) && (park.animate = false);
          return park;
        })
      }));
    });
  }

  filterParks = (query) => {
    // Run a simple case insensitive RegExp match.
    const re = new RegExp(query, 'i');

    this.setState({
      parks: parks.filter((park) => (
        re.test(park.title)
      ))
    });
  }

  focusSearchField = () => {
    // Focus only if we are opening the drawer
    this.state.showDrawer && this.searchField.current.focus();
  }

  toggleDrawer = () => {
    this.setState(
      (state) => ({showDrawer: !state.showDrawer}),
      //
      () => setTimeout(
        () => this.searchField.current.focus(),
        600
      )
    );
  }

  render() {
    return (
      <div className="App">
        <FilterMenu
          parks={this.state.parks}
          onParkClick={this.onParkClick}
          filterParks={this.filterParks}
          showDrawer={this.state.showDrawer}
          toggleDrawer={this.toggleDrawer}
          searchField={this.searchField}
        />
        <Header toggleDrawer={this.toggleDrawer}/>
        <Main
          parks={this.state.parks}
          onParkClick={this.onParkClick}
          onToggleInfo={this.onToggleInfo}
        />
      </div>
    );
  }
}

export default App;
