import React from 'react';
import './App.css';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      started: false,
      pause: false,
      timer: 0,
      pauseTime: 300000,
      workTime: 300000
    }
  }

  startTimer = () => {
    if (this.state.started) {
        return;
    }
    if (this.state.timer === 0) {
      this.setState({
        started: true,
        timer: this.state.pauseTime + this.state.workTime,
      });
    } else {
      this.setState({
        started: true,
      });
    }    
    this.timer = setInterval(() => {
      this.setState({ timer: this.state.timer - 10 });
      if (this.state.timer < this.state.pauseTime) {
        this.setState({ pause: true })
      } else {
        this.setState({ pause: false })
      }
      if (this.state.timer === 0 && this.state.started) {
        this.resetTimer();
        alert("Work done !")
      }
    }, 10);
  };

  stopTimer = () => {
    this.setState({ started: false })
    clearInterval(this.timer);
  };

  resetTimer = () => {
    this.stopTimer()
    this.setState({ 
      timer: this.state.pauseTime + this.state.workTime,
      pause: false,
      started: false
    })
  };

  changeWorkTime = (event) => {
    let val = 0
    if (event.target.value) {
      val = 0 + parseInt(event.target.value)*60000
    } 
    this.stopTimer()
    this.setState({ 
      workTime: val,
      timer: this.state.pauseTime + val,
      pause: false,
      started: false
    })
  }

  changePauseTime = (event) =>  {
    let val = 0
    if (event.target.value) {
      val = 0 + parseInt(event.target.value)*60000
    } 
    this.stopTimer()
    this.setState({ 
      pauseTime: val,
      timer: this.state.workTime + val,
      pause: false,
      started: false
    })
  }

  render () {
    const pause = this.state.pause
    const pauseTime = this.state.pauseTime
    const started = this.state.started
    const { timer } = this.state
    let seconds = ("0" + (Math.floor(timer / 1000) % 60)).slice(-2)
    let minutes = ("0" + (Math.floor(timer / 60000) % 60)).slice(-2); 
    let status
    if (pause) {
      status = <h3 class="green">Pause time :D</h3>
    } else if (!pause && started) {
      status = <h3 class="yellow">Work time :D</h3>
    } else {
      status = <h3 class="red">Stopped</h3>
    }

    let compteur;
    if (timer <= (pauseTime+20000) && !pause || timer <= 20000 && pause) {
      compteur = <h3 class="red">{minutes}m {seconds}s</h3>
    } else {
      compteur = <h3 class="blue">{minutes}m {seconds}s</h3>
    }

    return (
      <div className="App">
        <header className="App-header">
          <h2>Pomodoro</h2>
          {compteur}
          <h4>{status}</h4>
          <div class="form">
            <label>
              Working time<br /> (minutes)<br />
              <input type="number" value={this.state.workTime/60000} onChange={this.changeWorkTime} />
            </label>
            <label>
              Pause time<br /> (minutes)<br /> 
              <input type="number" value={this.state.pauseTime/60000} onChange={this.changePauseTime} />  
            </label>
          </div>
          <div>
            <button onClick={this.startTimer}>Start</button>
            <button onClick={this.stopTimer}>Stop</button>
            <button onClick={this.resetTimer}>Reset</button>
          </div>
        </header>
      </div>
    );
  }
}

export default App;
