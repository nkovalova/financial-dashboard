import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './styles/index.css'
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <App />,
)
