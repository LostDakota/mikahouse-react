import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import Routes from "./Routes";

import './App.scss';

const navList = [
  { name: 'Home', path: '/', icon: 'fa-home' },
  { name: 'Media', path: '/media', icon: 'fa-play-circle' },
  { name: 'Controls', path: '/controls', icon: 'fa-lightbulb' },
  { name: 'Security', path: '/security', icon: 'fa-video' },
  { name: 'Services', path: '/services', icon: 'fa-database' },
  { name: 'Events', path: '/events', icon: 'fa-exclamation-circle' }
]

let buildNav = () => {
  return navList.map((item, i) => {
    return (
      <li className="nav-item m-5-y" key={i}>
        <NavLink to={item.path} exact activeClassName="active">
          <i className={`fa ${item.icon} m-5-y`}></i>
          <p className="t-small">{item.name}</p>
        </NavLink>
      </li>
    )
  })
}

const Navigation = () => (
  <nav className="row">
    <ul>
      {buildNav()}
    </ul>
  </nav>
);

class App extends Component {
  render() {
    return (
      <>        
        <header className="t-bold">Home</header>
        <div id="header-spacer"></div>
        <div className="container">
          <div className="row" style={{ overflow: 'hidden' }}>
            <Routes />
            <div id="nav-spacer"></div>
          </div>
        </div>
        <Navigation />
      </>
    );
  }
}

export default App;
