import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.scss'
import { observer } from 'mobx-react-lite'
import appState from './store/appstate'
import firebaseService from './InitFirebase';
import Restaurants from './components/restaurants';

const App = observer(() => {
  const [count, setCount] = useState(0)

  return (
    <>
    {appState.userLoggedIn ?
      <>
      <Restaurants />
      <button onClick={() => firebaseService.signOut()}>Sing Out</button>
      </>
      :
      <button onClick={() => firebaseService.signIn()}>Log In</button>
    }
    </>
  )
});

export default App
