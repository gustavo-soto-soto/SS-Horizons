const PLANE_SPEED = 800 //KM/H

export const calculateFlightDuration = (distance, speed=PLANE_SPEED) => {

  const flightDuration = parseFloat( (distance / speed).toFixed(2) )

  return flightDuration;
};