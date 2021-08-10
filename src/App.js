import './App.css';
import {BrowserRouter as Router,Switch,Route,Redirect} from 'react-router-dom';
import AddressBookForm from '../src/component/addressbook-form/addressbook-form.jsx';
import AddressBookHome from './component/addressbook-home/addressbook-home';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/form" >
            <AddressBookForm/>
          </Route>
          <Route exact path="/home" >
            <AddressBookHome/>
          </Route>
          <Route exact path="/form/:id"><AddressBookForm /></Route>
          <Route exact path=""><Redirect exact from="/" to="/home" /></Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
