import { Schema, model, models } from "mongoose";

const roleSchema = new Schema({
  role_name: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
  },
  permissions: Object,
});

const Role = models.Role || model("Role", roleSchema);

export default Role