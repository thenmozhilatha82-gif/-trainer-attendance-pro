import { useLocalStorage } from './hooks/useLocalStorage';
import { trainers as initialTrainers, batches as initialBatches } from './data/mockData';
import Dashboard from './components/Dashboard';
import Attendance from './components/Attendance';
import Reports from './components/Reports'; // Line 5: Itha add pannu
import './index.css';

function App() {
  const [trainers, setTrainers] = useLocalStorage('trainers', initialTrainers);
  const [batches, setBatches] = useLocalStorage('batches', initialBatches);
  const [attendance, setAttendance] = useLocalStorage('attendance', []);

  return (
    <div className="min-h-screen bg-gray-100 pb-10">
      <Dashboard trainers={trainers} batches={batches} attendance={attendance} />
      <Attendance
        trainers={trainers}
        batches={batches}
        attendance={attendance}
        setAttendance={setAttendance}
      />
      <Reports trainers={trainers} attendance={attendance} /> {/* Line 21: Itha add pannu */}
    </div>
  );
}

export default App;