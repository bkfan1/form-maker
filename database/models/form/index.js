import { model, models, Schema } from "mongoose";

const formSchema = new Schema(
  {
    accountId: { type: Schema.ObjectId, ref: "Account" },
    title: { type: String },
    description: { type: String },

    questions: { type: Array },

    submissions: { type: Array },

    createdAt: { type: Date },
    updatedAt: { type: Date },
  },
  { collection: "forms" }
);

export default models.Form || model("Form", formSchema);
