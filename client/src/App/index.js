import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// import Header from '../components/Header';
import Home from '../components/pages/Home';
import NotFound from '../components/pages/NotFound';

// import './style.css';

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route component={NotFound} />
        </Switch>
      </div>
    </Router>
  )
}

export default App;