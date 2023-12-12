import { Schema, model, models } from "mongoose";

const airlineSchema = new Schema({
    airline_name: {
        type: String,
        required: true,
        unique: true
    },
    IATA_code: {
        type: String,
        required: true,
        unique: true
    },
    country: {
        type: String,
        required: true,
    }
})

const Airline = models.Airline || model('Airline', airlineSchema)

export default Airline