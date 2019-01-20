import { style } from 'typestyle';

const $mainColor = '#abbcd980';
const $numberColor = '#6483b9';

export const pomodoroStyle = style({
  height: '100vh',
  width: '100vw',
  margin: 0,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
});

export const squareStyle = style({
  textAlign: 'center',
  width: '80vmin',
  height: '80vmin',
  position: 'relative'
});

export const outerCircleStyle = style({
  position: 'absolute',
  height: '90vmin',
  width: '90vmin',
  left: '-5vmin',
  top: '-5vmin',
  borderRadius: '50%'
});

export const circleStyle = style({
  position: 'absolute',
  top: '5vmin',
  left: '5vmin',
  height: '70vmin',
  width: '70vmin',
  borderRadius: '50%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
});

export const controlStyle = style({
  position: 'absolute',
  top: '65%',
  display: 'flex'
});

export const centerStyle = style({
  color: $numberColor,
  fontSize: '18vmin',
  // TODO: Set digital font as fontFamily for time
});

export const controlIconStyle = style({
  margin: '0 1vmin',
  cursor: 'pointer',
  $nest: {
    '& svg': {
      fill: $mainColor,
      $nest: {
        '&:hover': {
          fill: $numberColor
        },
      }
    },
  }
})
