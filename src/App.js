import React from 'react';
import {Route} from 'react-router-dom';
import { Home } from './components/Home/Home';
import { Profile } from './components/Profile/Profile';
import { Nav } from './components/Nav/Nav';
import Auth from './Auth/Auth';
import CallBackAuth from './CallBackAuth/CallBackAuth';
function App(props) {

  const auth = new Auth(props.history);

  return (
    <>
      <Nav/>
      <Route path="/home" exact render = { props => <Home auth = {auth} {...props}></Home>} />
      
      <Route path="/callbackauth" exact render = { props => <CallBackAuth auth = {auth} {...props}></CallBackAuth>} />

      
      <Route path="/profile" exact component={Profile} />
    </>
  );
}

export default App;
