import { Schema, models, model } from "mongoose";

const accountSchema = new Schema(
  {
    fullname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },

    createdAt: { type: Date },
  },
  { collection: "accounts" }
);

export default models.Account || model("Account", accountSchema);
