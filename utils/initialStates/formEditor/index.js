import { nanoid } from "nanoid";

export const initialFormState = {
  id: nanoid(),
  title: "Untitled form",
  description: "Description of this form",

  questions: [],

  published: false,
  createdAt: new Date().toLocaleDateString(),
  updatedAt: null,
};
