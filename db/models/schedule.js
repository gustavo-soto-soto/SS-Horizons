import { Schema, model, models } from "mongoose";

const scheduleSchema = new Schema({
    coordinates: {
        type: String,
        required: true,
        unique: true
    }
})

const Schedule = models.Schedule || model('Schedule', scheduleSchema)

export default Schedule