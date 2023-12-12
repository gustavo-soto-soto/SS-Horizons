const BASE_PRICE = 50;
const KM_PRICE = 0.1;
const VARIABILITY_RANGE = 10; // DOLLAR RANGE TO UP OR DOWN FINAL PRICE

export const calculateFlightPrice = (distance, price = KM_PRICE) => {
  const variability = (Math.random() * VARIABILITY_RANGE * 2) - VARIABILITY_RANGE;
  
  const basePrice = BASE_PRICE + distance * price;

  const finalPrice = parseFloat(basePrice + variability).toFixed(2);

  return finalPrice;
};
