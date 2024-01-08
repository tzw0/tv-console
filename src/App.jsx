import './App.scss';
import Home from './components/home/Home';
import TouchPad from './components/touchpad/TouchPad';
import Test from './components/test/Test';
// import {BrowserView, MobileView} from 'react-device-detect';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
// Seems like hash router need hard refresh cntrl-shift-r to work.

function App() {
  return (
    <div className="App">
      <Router basename="">
        <Switch>
          <Route path='/rat-tv' ><Home/></Route>
          <Route path='/test' ><Test/></Route>
          <Route path='/'><TouchPad /></Route>
        </Switch>
      </Router>

        {/* <BrowserView><Home/>
        </BrowserView>
        <MobileView><TouchPad /></MobileView>
        <MobileView><Test/></MobileView> */}
    </div>
  );
}

export default App;