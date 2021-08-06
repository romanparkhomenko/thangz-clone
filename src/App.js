import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import { StateProvider } from './context/AppContext';
import Model from './pages/Model';

export default function App() {
  const initialAppState = {
    sortModelsBy: 'trending',
    homePageLoading: true,
    models: [],
  };

  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/">
            <StateProvider initialState={initialAppState}>
              <Home className="home-page" />
            </StateProvider>
          </Route>
          <Route path="/model/:modelId">
            <StateProvider initialState={initialAppState}>
              <Model className="model-page" />
            </StateProvider>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
