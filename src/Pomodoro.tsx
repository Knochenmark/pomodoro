import './Pomodoro.css';

import * as React from 'react';

import Pause from './icons/Pause';
import Play from './icons/Play';
import Replay from './icons/Replay';

interface IPomodoroStateProps {
  minutes: string,
  seconds: string,
  time: number,
  isRunning: boolean,
  intervalId: number
}

export default class Pomodoro extends React.Component<{}, IPomodoroStateProps> {
  private initialTime = 1500;

  constructor(props = {}) {
    super(props);
    this.state = {
      isRunning: false,
      minutes: '25',
      seconds: '00',
      time: this.initialTime,
      intervalId: 0
    };
    this.startTimer = this.startTimer.bind(this);
    this.resetClock = this.resetClock.bind(this);
  }

  public convertToDisplayTime(ms: number) {
    const minutesNum = Math.floor(ms / 60);
    const secondsNum = ms % 60;
    const minutes = minutesNum < 10 ? '0' + minutesNum : String(minutesNum);
    const seconds = secondsNum < 10 ? '0' + secondsNum : String(secondsNum);
    document.title = `Pomodoro ${minutes}:${seconds}`;
    this.setState({ minutes, seconds });
  }

  public resetClock() {
    clearInterval(this.state.intervalId);
    this.setState({
      time: this.initialTime,
      isRunning: false
    });
    this.convertToDisplayTime(this.initialTime);
    document.title = 'Pomodoro';
  }

  public updateTime() {
    console.log(this.state.time)
    if (this.state.time > 0) {
      this.setState({ time: this.state.time - 1 })
      this.convertToDisplayTime(this.state.time - 1);
    } else {
      this.setState({ isRunning: false })
      clearInterval(this.state.intervalId);
    }
  }

  public startTimer() {
    if (!this.state.isRunning) {
      const intervalId = window.setInterval(this.updateTime.bind(this), 1000);
      this.setState({ intervalId });
    } else {
      clearInterval(this.state.intervalId);
    }
    this.setState({ isRunning: !this.state.isRunning });
  }

  public render() {

    const numbers = Array.from(Array(60).keys()).filter(n => n % 5 === 0).map((num) => {
      return <div key={`number${num}`} className={`number pos${num}`}>{num}</div>
    });

    const bullets = Array.from(Array(60).keys()).map((num) => {
      let size = 'small';
      if (num % 5 === 0) {
        size = 'medium';
      }
      if (num === 0 || num === 15 || num === 30 || num === 45) {
        size = 'large';
      }
      const time = num <= Number(this.state.minutes) ? 'time' : '';
      return <div key={`bullet${num}`} className={`bullet pos${num} ${size} ${time}`} data-time={num} />
    });

    const playIcon = this.state.isRunning ? <Pause /> : <Play />

    return (
      <div className="wrapper">
        <div className="square">
          <div className="outer-circle">
            {bullets}
          </div>
          <div className="circle">
            {numbers}
            <div className="center">
              <span className="min">{this.state.minutes}</span>
              <span className={`colon${this.state.isRunning ? ' tick' : ''}`}>:</span>
              <span className="sec">{this.state.seconds}</span>
            </div>
            <div className="controls">
              <i onClick={this.startTimer}>{playIcon}</i>
              <i onClick={this.resetClock}><Replay /></i>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
