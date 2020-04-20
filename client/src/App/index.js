import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from '../components/pages/Home';

import './style.css';

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path='/' component={Home} />
          {/* <Route component={NotFound} /> */}
        </Switch>
      </div>
    </Router>
  );
}

export default App;