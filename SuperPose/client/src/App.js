import React, { Component } from 'react';
import './App.css';
import {
  BrowserRouter,
  Switch,
  Route} from 'react-router-dom';
import history from './utils/History';
import Image from './containers/imagePage';
import Video from './containers/videoPage';


class App extends Component {
  render() { 
    return (
      <BrowserRouter history={history}  basename={process.env.PUBLIC_URL}>
          <div className="container">
            <Switch>
              <Route path="/" exact component={Image}/>
              <Route path="/video" exact component={Video}/>
            </Switch>
          </div>
          {/* <Footer/> */}
      </BrowserRouter>
    )
  }
}

export default App;
