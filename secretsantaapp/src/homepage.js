import React from 'react';
import fire from './config/Fire';
import Groups from './Groups/groups';
import CreateGroup from './Groups/creategroup';
import Wishlist from './Wishlist/wishlist';
import Home from './Home/home';
import GroupPage from './Groups/groupPage';

import {
    BrowserRouter as Router,
    Route,
    Switch,
  } from "react-router-dom";

  function homepage() {
    return(
      <Router>
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route exact path="/grouppage" component={GroupPage}/>
          {/* <Route exact path="/groups" component={Groups}/> */}
          <Route exact path="/groups/:groupCode" render={({match}) => <Groups groupCode={match.params.groupCode} user={fire.auth().currentUser}/>}/>
          <Route exact path="/creategroup" component={CreateGroup}/>
          <Route exact path="/wishlist" component={Wishlist}/>
        </Switch>
      </Router>
    );
  }

  export default homepage;