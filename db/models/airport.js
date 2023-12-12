import { Schema, model, models } from "mongoose";

const airportSchema = new Schema({
    airport_name: {
        type: String,
        required: true,
        unique: true
    },
    city: {
        type: String,
        required: true,
    },
    country: {
        type: String,
        required: true,
    },
    IATA_code: {
        type: String,
        required: true,
        unique: true
    },
    coordinates: {
        type: String,
        required: true,
        unique: true
    },
    tags: {
        type: [String],
        required: true
    }
})

const Airport = models.Airport || model('Airport', airportSchema)

export default Airport