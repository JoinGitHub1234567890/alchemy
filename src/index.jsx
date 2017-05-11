import React from 'react'
import { render } from 'react-dom'
import HTML5Backend from 'react-dnd-html5-backend'
import { DragDropContext } from 'react-dnd'
import { ipcRenderer } from 'electron'

import Tray from './components/Tray'
import api from './api'

require('../styles/index.scss')

// initialize api
ipcRenderer.send('APP_PATH_REQUEST')

ipcRenderer.on('APP_PATH_REPLY', (event, arg) => {
  console.log('REPLY received...')
  console.log('arg: ' + arg)
  api.init(arg)
})


const App = DragDropContext(HTML5Backend)(Tray)

render(
  <App />,
  document.getElementById('root')
)
