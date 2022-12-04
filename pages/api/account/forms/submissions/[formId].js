import { addNewSubmission } from "../../../../../middlewares/forms";

export default async function handler(req, res) {
  switch (req.method) {
    case "PUT":
      return await addNewSubmission(req, res);

    default:
      return await res.status(405).json({ message: "" });
  }
}
