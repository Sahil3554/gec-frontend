// import logo from "./logo.svg";
import "./App.css";
import Login from "./components/Login";
import { BrowserRouter as Router, Route } from "react-router-dom";
import ErrorPage from "./components/ErrorPage";
import Discover from "./components/Discover";
import Register from "./components/Register";
function App() {
  return (
    <div className="App">
      <Router>
        <Route exact path="/" component={Login}></Route>
        <Route exact path="/signup/:id" component={Register}></Route>
        <Route exact path="/signup" component={Register}></Route>
        <Route exact path="/dashboard" component={Discover}></Route>
        {/* <Route exact path="*" component={ErrorPage}></Route> */}
      </Router>
    </div>
  );
}

export default App;
