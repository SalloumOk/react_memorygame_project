import "./App.css";
import React, { Component } from "react";
import GameItem from "./components/GameItem";
import Congratulations from "./components/Congratulations";

class App extends Component {
  constructor(props) {
    super(props);

    const best = localStorage.getItem("best");

    this.state = {
      score: 0,
      bestScore: best ? best : 0,
      numbers: [
        {
          content: "circle",
          wasViewed: false,
          color: this.randomHEX(),
        },
        {
          content: "square",
          wasViewed: false,
          color: this.randomHEX(),
        },
        {
          content: "triangle",
          wasViewed: false,
          color: this.randomHEX(),
        },
        {
          content: "star",
          wasViewed: false,
          color: this.randomHEX(),
        },
        {
          content: "pentagon",
          wasViewed: false,
          color: this.randomHEX(),
        },
        {
          content: "hexagon",
          wasViewed: false,
          color: this.randomHEX(),
        },
        {
          content: "heptagon",
          wasViewed: false,
          color: this.randomHEX(),
        },
        {
          content: "octagon",
          wasViewed: false,
          color: this.randomHEX(),
        },
        {
          content: "nanogon",
          wasViewed: false,
          color: this.randomHEX(),
        },
        {
          content: "decagon",
          wasViewed: false,
          color: this.randomHEX(),
        },
      ],
    };

    this.checkScore = this.checkScore.bind(this);
    this.randomizeNumbers = this.randomizeNumbers.bind(this);
  }

  randomHEX() {
    return Math.floor(Math.random() * 16777215).toString(16);
  }

  flashCongratulations() {
    const congrats = document.getElementById("congratulations");
    congrats.classList.toggle("show-congrats");
    setTimeout(() => congrats.classList.toggle("show-congrats"), 5000);
  }

  checkScore(item, answer) {
    let tempArray = this.randomizeNumbers();
    // Checks item has been click vs user answer
    if (item.wasViewed === answer) {
      let incrementedScore = this.state.score + 1;
      // Correct answer
      // Continue playing the game, increasing the score
      if (incrementedScore === 10) {
        // User has won the game
        // Reset game, save best score

        // Display congratulations message
        this.flashCongratulations();

        // Set score to 0, save best score, randomize numbers
        localStorage.setItem("best", incrementedScore);
        this.setState({
          score: 0,
          bestScore: incrementedScore,
          numbers: tempArray,
        });
      } else {
        // Continue playing
        tempArray.forEach((num) => {
          if (num.content == item.content) {
            num.wasViewed = true;
          }
        });
        const newBest =
          this.state.bestScore > incrementedScore
            ? this.state.bestScore
            : incrementedScore;

        localStorage.setItem("best", newBest);

        this.setState({
          score: incrementedScore,
          bestScore: newBest,
          numbers: tempArray,
        });
      }
    } else {
      // Incorrect answer, reset game
      // ========= REFACTOR TO DRY
      tempArray.forEach((item) => {
        item.wasViewed = false;
      });
      this.setState({
        score: 0,
        bestScore:
          this.state.bestScore > this.state.score
            ? this.state.bestScore
            : this.state.score,
        numbers: tempArray,
      });
    }
  }

  randomizeNumbers() {
    let array = this.state.numbers;
    let index = this.state.numbers.length,
      temporaryIndex,
      randomIndex;

    while (0 !== index) {
      randomIndex = Math.floor(Math.random() * index);
      index -= 1;

      temporaryIndex = array[index];
      array[index] = array[randomIndex];
      array[index].color = this.randomHEX();
      array[randomIndex] = temporaryIndex;
      array[randomIndex].color = this.randomHEX();
    }

    return array
  }

  componentDidMount() {
    let array = this.randomizeNumbers();
    this.setState({ numbers: array });
  }

  render() {
    const randomIndex = Math.floor(Math.random() * this.state.numbers.length);
    const selectedNum = this.state.numbers[randomIndex];
  
    return (
      <main className="App">
        <header className="App-header">
          <h1>React Memory Game</h1>
          <p>
            Answer the questions to test your memory.<br></br>
            Highest score is 10!
          </p>
          <div className="App-scoreboard">
            <span>Score: {this.state.score}</span>
            <span>Best Score: {this.state.bestScore}</span>
          </div>
        </header>
        <section className="App-container">
          <Congratulations />
          <div className="App-item-container">
            <GameItem value={selectedNum} />
            <div>
              <h3>Have you seen this number yet?</h3>
              <button
                id="no"
                className="btn"
                onClick={() => this.checkScore(selectedNum, false)}
              >
                No
              </button>
              <button
                id="yes"
                className="btn"
                onClick={() => this.checkScore(selectedNum, true)}
              >
                Yes
              </button>
            </div>
          </div>
        </section>
      </main>
    );
  }
}

export default App;
