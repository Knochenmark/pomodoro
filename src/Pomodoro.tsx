import './Pomodoro.css';

import * as React from 'react';

import Pause from './icons/Pause';
import Play from './icons/Play';
import Replay from './icons/Replay';
import {
  centerStyle,
  circleStyle,
  controlIconStyle,
  controlStyle,
  outerCircleStyle,
  pomodoroStyle,
  squareStyle
} from './PomodoroStyles';

interface IPomodoroStateProps {
  minutes: string,
  seconds: string,
  time: number,
  initialTime: number,
  isRunning: boolean,
  intervalId: number
}

export default class Pomodoro extends React.Component<{}, IPomodoroStateProps> {
  constructor(props = {}) {
    super(props);
    this.state = {
      isRunning: false,
      minutes: '25',
      seconds: '00',
      time: 1500,
      initialTime: 1500,
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
      time: this.state.initialTime,
      isRunning: false
    });
    this.convertToDisplayTime(this.state.initialTime);
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

  public timeHandler(minutes: number) {
    if (minutes === 0) {
      minutes = 60;
    }
    const newTime = minutes * 60;
    this.setState({
      time: newTime,
      initialTime: newTime
    })
    this.convertToDisplayTime(newTime);
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
      return <div
        key={`bullet${num}`}
        className={`bullet pos${num} ${size} ${time}`}
        onClick={this.timeHandler.bind(this, num)}
      />
    });

    const playIcon = this.state.isRunning ? <Pause /> : <Play />

    return (
      <div className={pomodoroStyle}>
        <div className={squareStyle}>
          <div className={outerCircleStyle}>
            {bullets}
          </div>
          <div className={circleStyle}>
            {numbers}
            <div className={centerStyle}>
              <span>{this.state.minutes}</span>
              <span className={`colon${this.state.isRunning ? ' tick' : ''}`}>:</span>
              <span>{this.state.seconds}</span>
            </div>
            <div className={controlStyle}>
              <i className={controlIconStyle} onClick={this.startTimer}>{playIcon}</i>
              <i className={controlIconStyle} onClick={this.resetClock}><Replay /></i>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
