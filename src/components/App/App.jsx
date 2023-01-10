import React from 'react';
import './App.css';
import Header from '../Header/Header.jsx';
import Main from '../Main/Main.jsx';
import Footer from '../Footer/Footer.jsx';
import { CurrentUserContext } from '../../contexts/CurrentUserContext.js';

function App() {
  const [currentUser, setCurrentUser] = React.useState({});

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header />
        <Main/>
        <Footer />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
