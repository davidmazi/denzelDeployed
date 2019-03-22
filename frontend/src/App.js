import React, { Component } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";

import "./App.css";
class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h3>Denzel Fan App</h3>
          <Avatar
            alt="Denzel"
            src="./images/denzel.jpg"
            style={{ width: "100px", height: "100px", margin: "10px" }}
          />
          <div style={{ margin: "20px" }}>
            <div>
              <Button
                variant="contained"
                color="secondary"
                className={Button.button}
                style={{ margin: "10px" }}
              >
                All Movies
              </Button>
              <Button
                variant="contained"
                color="secondary"
                className={Button.button}
                style={{ margin: "10px" }}
              >
                Search for a Movie
              </Button>
              <Button
                variant="contained"
                color="secondary"
                className={Button.button}
                style={{ margin: "10px" }}
              >
                Review a Movie
              </Button>
            </div>
            <div>
              <Button
                variant="contained"
                color="secondary"
                className={Button.button}
                style={{ margin: "10px" }}
              >
                Random Must-Watch Movie
              </Button>
              <Button
                variant="contained"
                color="secondary"
                className={Button.button}
                style={{ margin: "10px" }}
              >
                All Must-Watch Movies
              </Button>
            </div>
          </div>
        </header>
      </div>
    );
  }
}
export default App;
