import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import {Login} from './containers/Login';
import globalStyles from './styles/globalStyles';



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>    
      <Login />
      <globalStyles />  
  </React.StrictMode>,
)
