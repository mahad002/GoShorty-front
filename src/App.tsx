import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Layout from './components/Layout';
import LoginPage from './pages/LoginPage';

function App() {
  return (
    <Router>
      <Layout>
        <LoginPage />
      </Layout>
    </Router>
  );
}

export default App;