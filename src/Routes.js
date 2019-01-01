import React from "react";
import { Switch, Route } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";

import HomeContainer from './Home/HomeContainer';
import MediaContainer from './Media/MediaContainer';
import ControlsContainer from './Controls/ControlsContainer';
import SecurityContainer from './Security/SecurityContainer';
import ServicesContainer from './Services/ServicesContainer';
import EventsContainer from './Events/EventsContainer';
import SecurityEventsContainer from "./Events/SecurityEventsContainer";

const Outlet = () => (
  <>
    <Route render={({ location }) => {
      return (
        <Switch location={location}>
          <Route exact path="/" component={HomeContainer}></Route>
          <Route path="/media" component={MediaContainer}></Route>
          <Route path="/controls" component={ControlsContainer}></Route>
          <Route exact path="/security" component={SecurityContainer}></Route>
          <Route path="/security/events" component={SecurityEventsContainer}></Route>
          <Route path="/services" component={ServicesContainer}></Route>
          <Route path="/events" component={EventsContainer}></Route>
        </Switch>
      )
    }}>
    </Route>
  </>
)

// const Outlet = () => (
//   <>
//     <Route render={({ location }) => {
//       return (
//         <TransitionGroup>
//           <CSSTransition key={location.key} timeout={450} classNames="fade">
//             <Switch location={location}>
//               <Route exact path="/" component={HomeContainer}></Route>
//               <Route path="/media" component={MediaContainer}></Route>
//               <Route path="/controls" component={ControlsContainer}></Route>
//               <Route exact path="/security" component={SecurityContainer}></Route>
//               <Route path="/security/events" component={SecurityEventsContainer}></Route>
//               <Route path="/services" component={ServicesContainer}></Route>
//               <Route path="/events" component={EventsContainer}></Route>
//             </Switch>
//           </CSSTransition>
//         </TransitionGroup>
//       )
//     }}>
//     </Route>
//   </>
// )

const Routes = () => {
  return (
    <>
      <Outlet />
    </>
  )
}

export default Routes;