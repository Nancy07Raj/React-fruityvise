import React from "react";
import Fruit from "./fruit";
import Table from "./table";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Link } from "react-router-dom";
import "../style/App.css";

function App() {
  function Nav() {
    return (
      <nav>
        <Link to="/">Home</Link>
        <Link to="/fruit">Run Fruityvise</Link>
        <Link to="/table">Run API Call</Link>
      </nav>
    );
  }

  function Home() {
    return <h1>Home Page</h1>;
  }

  return (
    <>
      <Router>
        <Nav />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/fruit" component={Fruit} />
          <Route path="/table" component={Table} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
