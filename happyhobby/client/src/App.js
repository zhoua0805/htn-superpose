import React, { Component } from 'react';
import './App.css';
import {
  BrowserRouter,
  Switch,
  Route} from 'react-router-dom';
import history from './utils/History';
import Home from './containers/home';


class App extends Component {
  render() { 
    return (
      <BrowserRouter history={history}>
          <div className="container">
            <Switch>
              <Route path="/" exact component={Home}/>
            </Switch>
          </div>
          {/* <Footer/> */}
      </BrowserRouter>
    )
  }
}

export default App;
