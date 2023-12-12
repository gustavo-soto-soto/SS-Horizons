import { Schema, model, models } from "mongoose";

const luggageSchema = new Schema({
  luggage_name: {
    type: String,
    required: true,
    unique: true,
  },
  unit_price: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

const Luggage = models.Luggage || model("Luggage", luggageSchema);

export default Luggage;
