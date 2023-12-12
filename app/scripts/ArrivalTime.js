export const calculateArrivalTime = (departureTime, flightDuration) => {
  // Convert departure time to minutes
  const [departureHours, departureMinutes] = departureTime.split(':');
  const totalMinutesDeparture = parseInt(departureHours) * 60 + parseInt(departureMinutes);

  // Calculate arrival time in minutes
  const totalMinutesArrival = totalMinutesDeparture + Math.floor(flightDuration * 60);

  // Ensure total minutes are non-negative
  const adjustedTotalMinutesArrival = (totalMinutesArrival + 1440) % 1440; // 1440 minutes in a day

  // Convert total minutes to HH:mm format
  const arrivalHours = Math.floor(adjustedTotalMinutesArrival / 60);
  const arrivalMinutes = adjustedTotalMinutesArrival % 60;

  // Format the arrival time
  const arrivalTime = `${String(arrivalHours).padStart(2, '0')}:${String(arrivalMinutes).padStart(2, '0')}`;

  return arrivalTime;
}