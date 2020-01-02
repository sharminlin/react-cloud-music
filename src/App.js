import React from 'react'
import { GlobalStyle } from  './style'
import { IconStyle } from './assets/iconfont/iconfont'
import routes from './routes/index'
import { HashRouter } from 'react-router-dom'
import { renderRoutes } from 'react-router-config'
import { Provider } from 'react-redux'
import store from './store/index'

import Data from './application/Singers/data'

function App() {
  return (
    <Provider store={store}>
      <HashRouter>
        <div className="App">
          <GlobalStyle></GlobalStyle>
          <IconStyle></IconStyle>
          <Data>
            { renderRoutes(routes) }
          </Data>
        </div>
      </HashRouter>
    </Provider>
  );
}

export default App;
