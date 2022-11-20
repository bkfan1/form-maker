import { Schema, models, model } from "moongose";

const formSchema = new Schema({
  accountId: { type: Schema.ObjectId, ref: "Account" },

  title: { type: String, required: true },
  description: { type: String, required: false },

  questions: { type: Array },

  createdAt: { type: String },
  updatedAt: { type: String },

  published: { type: Boolean, required:true, },
}, {collection: 'forms'});

export default models.Form || model("Form", formSchema);
