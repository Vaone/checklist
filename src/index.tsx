import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { GlobalStyle } from './styles/Global.styled'
import { store } from './app/store'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import App from 'app/ui/App'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.Fragment>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
    <GlobalStyle />
  </React.Fragment>,
)
