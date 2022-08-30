import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { useState } from "react";

function App() {
  const [currentUser, setCurrentUser] = useState("X");
  const buttonStyle = {
    fontSize: "43px",
    color: "white",
    fontWeight: "500",
  };
  const [xRows, setxRows] = useState([0, 0, 0]);
  const [oRows, setoRows] = useState([0, 0, 0]);
  const [xCols, setxCols] = useState([0, 0, 0]);
  const [oCols, setoCols] = useState([0, 0, 0]);

  function move(e) {
    if (!e.target.textContent) {
      e.target.textContent = currentUser;
      e.target.classList.add("clickedClass");
      setCurrentUser(currentUser === "X" ? "O" : "X");
      if (currentUser === "X") {
        xRows[Math.floor(e.target.id / 3)] += 1;
        setxRows(xRows);
        xCols[e.target.id % 3] += 1;
        setxCols(xCols);
      } else if (currentUser === "O") {
        oRows[Math.floor(e.target.id / 3)] += 1;
        setoRows(oRows);
        oCols[e.target.id % 3] += 1;
        setoCols(oCols);
      }
      var result = CheckWinner();
      if (result !== null) {
        openPopup(result + " is winner! 🥳");
      } else if (
        result === null &&
        document.getElementsByClassName("clickedClass").length === 9
      ) {
        openPopup("TIE");
      }
    }
  }

  const CheckWinner = () => {
    if (
      currentUser === "X" &&
      (xRows.includes(3) ||
        xCols.includes(3) ||
        checkDiagonal("X", xRows, xCols))
    ) {
      return "X";
    } else if (
      currentUser === "O" &&
      (oRows.includes(3) ||
        oCols.includes(3) ||
        checkDiagonal("O", oRows, oCols))
    ) {
      return "O";
    }
    return null;
  };

  const checkDiagonal = (crUser, rowsArray, colsArray) => {
    if (
      checkButtonValueUser(["0", "4", "8"], crUser) ||
      checkButtonValueUser(["2", "4", "6"], crUser)
    ) {
      return true;
    }
    return false;
  };

  const checkButtonValueUser = (diagonal, user) => {
    for (let i = 0; i < diagonal.length; i++) {
      const element = diagonal[i];
      var buttonText = document.getElementById(element).textContent;
      if (buttonText !== user) {
        return false;
      }
    }
    return true;
  };

  const arraysEqual = (a, b) => {
    if (a === b) return true;
    if (a == null || b == null) return false;
    if (a.length !== b.length) return false;

    for (var i = 0; i < a.length; ++i) {
      if (a[i] !== b[i]) return false;
    }
    return true;
  };

  const resetGame = () => {
    var buttons = document.getElementsByClassName("btn-info");
    for (let currentButton of buttons) {
      currentButton.textContent = "";
      currentButton.classList.remove("clickedClass");
    }
    setxCols([0, 0, 0]);
    setoCols([0, 0, 0]);
    setxRows([0, 0, 0]);
    setoRows([0, 0, 0]);
    setCurrentUser("X");
  };

  function openPopup(winner) {
    document.getElementById("myPopup").style.display = "block";
    document.getElementById("myPopup").setAttribute("aria-hidden", "false");
    document.getElementById("popupText").textContent = winner;
  }

  const closePopUp = () => {
    document.getElementById("myPopup").style.display = "none";
    document.getElementById("myPopup").setAttribute("aria-hidden", "true");
    resetGame();
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>[ Fimple Game ]</h1>
        <h4>Current User: {currentUser}</h4>
        <div>
          {(() => {
            const buttons = [];
            for (let i = 0; i < 3; i++) {
              for (let j = 0; j < 3; j++) {
                buttons.push(
                  <Button
                    id={i * 3 + j}
                    className="btn btn-info"
                    onClick={move}
                    style={buttonStyle}
                  ></Button>
                );
              }
              buttons.push(<br></br>);
            }
            return buttons;
          })()}
        </div>
        <div>
          <button
            style={{ marginTop: "10px" }}
            className="custom-btn btn-3"
            onClick={resetGame}
          >
            <span>Reset</span>
          </button>
        </div>
        <div>
          <div
            className="popup"
            id="myPopup"
            aria-hidden="true"
            // onClick="if(event.target == this){closePopup('#myPopup');}"
          >
            <div
              className="wrapper"
              aria-labelledby="popupTitle"
              aria-describedby="popupText"
              aria-modal="true"
            >
              {/* <h2 id="popupTitle">This is my Popup</h2> */}
              <p id="popupText"></p>
              <button
                id="closePopup"
                aria-label="Close popup"
                onClick={closePopUp}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
