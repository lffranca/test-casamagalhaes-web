import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'

import ProviderStore from './store/ProviderStore'
import AppStyle from './AppStyle'
import HomePage from './pages/HomePage/HomePage';

class App extends Component {
  render() {
    return (
      <ProviderStore>
        <Router>
          <AppStyle>
            <Route exact path="/" component={HomePage} />
          </AppStyle>
        </Router>
      </ProviderStore>
    )
  }
}

export default App
