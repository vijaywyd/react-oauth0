import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { Home } from './components/Home/Home';
import Profile from './components/Profile/Profile';
import { Nav } from './components/Nav/Nav';
import Auth from './Auth/Auth';
import CallBackAuth from './CallBackAuth/CallBackAuth';
import PublicPage from './components/PublicPages/Publicpage';
import PrivatePage from './components/PrivatePages/PrivatePage';


function App(props) {

  const auth = new Auth(props.history);

  return (
    <>
      <Nav auth = {auth}/>

      <Route path="/home" exact render = { props => <Home auth = {auth} {...props}></Home>} />
      
      <Route path="/callbackauth" exact render = { props => <CallBackAuth auth = {auth} {...props}></CallBackAuth>} />

      <Route path="/profile" 
        render = {props => auth.isAuthenticated() ? <Profile auth = {auth} {...props}/> : <Redirect to="/home" />}/>

      <Route path="/public" component = {PublicPage} />

      <Route path="/private" 
        render = {props => auth.isAuthenticated() ? (<PrivatePage auth = {auth} {...props} hi = "hi"/>) : null}/>

    </>
  );
}

export default App;