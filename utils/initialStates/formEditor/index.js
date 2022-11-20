import { nanoid } from "nanoid";

export const initialFormState = {
  id: nanoid(),
  title: "Untitled form",
  description: "Description of this form",

  questions: [],

  createdAt: new Date().toLocaleDateString(),
  updatedAt: null,
};
