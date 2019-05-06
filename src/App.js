import React from 'react';
import {Route} from 'react-router-dom';
import { Home } from './components/Home/Home';
import { Profile } from './components/Profile/Profile';
import { Nav } from './components/Nav/Nav';
function App() {
  return (
    <>
      <Nav/>
      <Route path="/home" exact component={Home} />
      <Route path="/profile" exact component={Profile} />
    </>
  );
}

export default App;
