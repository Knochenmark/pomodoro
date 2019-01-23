import { style } from 'typestyle';

const $mainColor = '#abbcd980';
const $numberColor = '#6483b9';

const circleRotation = (pos: number) => {
  if ((pos * 6 - 90) < 0) {
    return `${(pos * 6) - 90 + 360}deg`;
  } else {
    return `${(pos * 6) - 90}deg`;
  }
};

export const circlePosition = (pos: number, trans: number) => {
  return style({
    transform: `rotate(${circleRotation(pos)}) translate(${trans}vmin) rotate(-${circleRotation(pos)})`
  })
};

export const numberStyle = style({
  color: $numberColor,
  position: 'absolute',
  top: '50%',
  left: '50%',
  width: '6vmin',
  height: '6vmin',
  margin: '-3vmin',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  fontSize: '2.5vmin',
});

export const bulletStyle = style({
  cursor: 'pointer',
  borderRadius: '50%',
  backgroundColor: $mainColor,
  position: 'absolute',
  top: '50%',
  left: '50%',
  $nest: {
    '&:hover': {
      backgroundColor: $numberColor
    },
    '&.time': {
      backgroundColor: $numberColor
    },
    '&.large': {
      width: '6vmin',
      height: '6vmin',
      margin: '-3vmin'
    },
    '&.medium': {
      width: '4vmin',
      height: '4vmin',
      margin: '-2vmin'
    },
    '&.small': {
      width: '2vmin',
      height: '2vmin',
      margin: '-1vmin'
    }
  }
});

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
});

export const bugStyle = style({
  $nest: {
    '& svg': {
      $nest: {
        '&:hover': {
          fill: '#ff5537',
          cursor: 'pointer'
        }
      },
      fill: '#666',
      transform: 'rotate(45deg)',
    }
  },
  width: '35px',
  height: '35px',
  borderTopLeftRadius: '100%',
  position: 'absolute',
  top: '0.5rem',
  right: '0.5rem',
  zIndex: 1,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
});