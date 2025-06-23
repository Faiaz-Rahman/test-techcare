import { Colors } from '@constants'
import { Routes } from '@routes/index'

import { persistor, store } from '@store/index'

import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

function App(): React.JSX.Element {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Routes />
      </PersistGate>
    </Provider>
  )
}

export default App
