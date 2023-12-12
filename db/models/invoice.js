import { Schema, model, models } from "mongoose";

// Define el esquema principal
const invoiceSchema = new Schema({
    user_id: String,
    origin: Object,
    destination: Object,
    departureDate: String,
    returnDate: String,
    distance: String,
    duration: Number,
    travelers: Number,
    airline: Object,
    departure_time: String,
    price: String,
    arrival_time: String,
    luggage: [Object],
    seats: [Object],
    travelerData: [Object],
    billing: Object,
    total_luggage: Number,
    total_seats: Number,
    total_price: Number,
  });
const Invoice = models.Invoice || model('Invoice', invoiceSchema)

export default Invoice