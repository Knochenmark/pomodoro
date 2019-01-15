import './Pomodoro.css';

import * as React from 'react';

interface IPomodoroStateProps {
  minutes: string,
  seconds: string,
  time: number,
  isRunning: boolean
}

export default class Pomodoro extends React.Component<{}, IPomodoroStateProps> {
  private initialTime = 1500;
  // TODO Add interval member

  constructor() {
    super({});
    this.state = {
      isRunning: false,
      minutes: '25',
      seconds: '00',
      time: this.initialTime
    };
    this.startTimer = this.startTimer.bind(this);
    this.resetClock = this.resetClock.bind(this);
  }

  public convertToDisplayTime(ms: number) { // TODO Evaluate if the param is needed
    const minutesNum = Math.floor(ms / 60);
    const secondsNum = ms % 60;
    const minutes = minutesNum < 10 ? '0' + minutesNum : String(minutesNum);
    const seconds = secondsNum < 10 ? '0' + secondsNum : String(secondsNum);
    this.setState({ minutes, seconds });
  }

  public resetClock() {
    // TODO: clearInterval(intervalId);
    this.setState({ time: this.initialTime });
    this.convertToDisplayTime(this.initialTime);
  }

  public startTimer() {
    if (!this.state.isRunning) {
      // intervalId = window.setInterval(updateTimer, 1000);
      // TODO: Set interval
    } else {
      // clearInterval(intervalId);
      // TODO: Clear interval
    }
    this.setState({ isRunning: !this.state.isRunning });
  }

  public render() {

    const numbers = Array.from(Array(60).keys()).filter(n => n % 5 === 0).map((num) => {
      return <div key={`number${num}`} className={`number pos${num}`}>{num}</div>
    });

    // function updateDisplayTime(time) {
    //   $('div .bullet').removeClass("time");
    //   $('div .bullet').slice(0, Number(time.minutes) + 1).addClass("time");
    // }
    // TODO: integrate time class into the bullet creation

    const bullets = Array.from(Array(60).keys()).map((num) => {
      let size = 'small';
      if (num % 5 === 0) {
        size = 'medium';
      }
      if (num === 0 || num === 15 || num === 30 || num === 45) {
        size = 'large';
      }
      return <div key={`bullet${num}`} className={`bullet pos${num} ${size}`} data-time={num} />
    });

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
              {/* TODO play icon based on isRunning */}
              <i onClick={this.startTimer}>Play Arrow</i>
              <i onClick={this.resetClock}>Replay</i>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
