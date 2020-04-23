import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from '../components/Header';
import Home from '../components/pages/Home';

import './style.css';

function App() {
  return (
    <Router>
      <div>
        <Header />
        <Switch>
          <Route exact path='/' component={Home} />
          {/* <Route component={NotFound} /> */}
        </Switch>
      </div>
    </Router>
  );
}

export default App;