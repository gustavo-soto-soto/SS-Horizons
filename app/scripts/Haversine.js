const EARTH_RADIUS_KM = 6371;

const degreesToRadians = (degrees) => {
    return degrees * Math.PI / 180;
};

export const calculeDistanceCordinates = (origin, destination) => { //COORDINATES FORMAT [0, 0] x,y

    let originRadians = {
        lat: degreesToRadians(origin[0]),
        lng: degreesToRadians(origin[1]),
    }

    let destinationRadians = {
        lat: degreesToRadians(destination[0]),
        lng: degreesToRadians(destination[1]),
    }

    let diferenceBetweenLong = (destinationRadians.lng - originRadians.lng);
    let diferenceBetweenLat = (destinationRadians.lat - originRadians.lat);

    let a = Math.pow(Math.sin(diferenceBetweenLat / 2.0), 2) + Math.cos(originRadians.lat) * Math.cos(destinationRadians.lat) * Math.pow(Math.sin(diferenceBetweenLong / 2.0), 2);

    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    let distance = parseFloat(EARTH_RADIUS_KM * c).toFixed(2)

    return distance;
};