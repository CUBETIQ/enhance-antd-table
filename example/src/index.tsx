import './index.css'

import React from 'react'
import App from './App'

// ReactDOM.render(<App />, document.getElementById('root'))

import { createRoot } from 'react-dom/client'
import './index.css'

const Main = () => {
    return (
        <React.StrictMode>
            <App />
        </React.StrictMode>
    )
}
const container =
    document.getElementById('root') ?? document.createElement('div')
const root = createRoot(container)
root.render(<Main />)
