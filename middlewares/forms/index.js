import connection from "../../database/connection";
import Account from "../../database/models/account";

export const getAccountForms = async (token) => {
  const { accountId } = token;

  try {
    const db = await connection();
    const found = await Account.findOne({ _id: accountId });
    const { forms } = found;

    return forms;
  } catch (error) {
    return false;
  }
};

export const getUniqueForm = async (token, id) => {
  const { accountId } = token;

  try {
    const db = await connection();
    const found = await Account.findOne({ _id: accountId });

    const form = found.forms.find((form) => form.id === id);

    return form;
  } catch (error) {
    return false;
  }
};

export const createForm = async (req, res, decodedToken) => {
  const { accountId } = decodedToken;

  if (!accountId) {
    return await res.status(403).json({ message: "" });
  }

  const { body } = req;

  try {
    const db = await connection();

    const found = await Account.findOne({ _id: accountId });
    const { forms } = found;
    const newForms = [...forms, body];

    const filter = { _id: accountId };
    const update = { forms: newForms };

    await Account.findOneAndUpdate(filter, update, { new: true });

    return await res.status(200).json({ message: "" });
  } catch (error) {
    return await res.status(500).json({ message: "" });
  }
};

export const updateUniqueForm = async (req, res, token) => {
  const { body, query } = req;
  const { formId } = query;

  const { accountId } = token;

  try {
    const db = await connection();

    const found = await Account.findOne({ _id: accountId });

    const { forms } = found;
    const updatedForms = [...forms];
    const index = updatedForms.findIndex((form) => form.id === formId);
    updatedForms.splice(index, 1, body);

    const filter = { _id: accountId };
    const update = { forms: updatedForms };

    await Account.findOneAndUpdate(filter, update, { new: true });

    return await res.status(200).json({ message: "" });
  } catch (error) {
    return await res.status(500).json({ message: "" });
  }
};

export const deleteUniqueForm = async (req, res, token) => {
  const { query } = req;
  const { formId } = query;

  const { accountId } = token;

  try {
    const db = await connection();

    const found = await Account.findOne({ _id: accountId });

    const { forms } = found;
    const updatedForms = [...forms];
    const index = updatedForms.findIndex((form) => form.id === formId);

    updatedForms.splice(index, 1);

    const filter = { _id: accountId };
    const update = { forms: updatedForms };

    await Account.findOneAndUpdate(filter, update, { new: true });

    return await res.status(200).json({ message: "" });
  } catch (error) {
    return await res.status(500).json({ message: "" });
  }
};
