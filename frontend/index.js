import React, { useState , createContext} from 'react';
import ReactDOM from 'react-dom/client';
import App from './src/App';

export const Context  = createContext({isAuthenticated:false});

const AppWrapper = () =>{
  
  const [isAuthenticated,setIsAuthenticated] = useState(false);
  const [ admin, setAdmin] = useState(false);

  return(
    <Context.Provider value ={{isAuthenticated, setIsAuthenticated,admin, setAdmin}}>
      <App/>
    </Context.Provider>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AppWrapper />
  </React.StrictMode>
);
