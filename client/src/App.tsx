import Dashboard from './components/Dashboard';
import styles from './styles/App.module.css';

const App = () => {
  return (
    <div className={styles.wrapper}>
      <h1>Financial Dashboard</h1>
      <p>
        Problem description: The user has data from two different data sources in the CSV format. 
        These CSV files have financial transactions with different PL account lists.
        Also, we have our best-practice list of PL accounts.
      </p>
      <Dashboard />
    </div>
  );
};

export default App;