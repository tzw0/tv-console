import './App.scss';
import Home from './components/home/Home';
import TouchPad from './components/touchpad/TouchPad';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/rat-tv' element={<Home/>}></Route>
          <Route path='/' element={<TouchPad />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;