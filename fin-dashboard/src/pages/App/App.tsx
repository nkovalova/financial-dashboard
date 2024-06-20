import React from 'react';
import FileUpload from './components/FileUpload';
import Dashboard from './components/Dashboard';

const App = () => {
  return (
    <div>
      Problem description: 
The user has data from two different data sources in the CSV format.  These CSV files have financial transactions with different PL account lists. Also, we have our best-practice list of PL accounts. 

      <h1>Financial Dashboard</h1>
      <FileUpload />
      <Dashboard />
    </div>
  );
};

export default App;