import connection from "../../database/connection";
import Form from "../../database/models/form";
import Account from "../../database/models/account";
import {
  domain,
  generateInvitationHTMLString,
  generateSubmitFormLink,
} from "../../utils/strings";
import { createTransport } from "nodemailer";

const sendEmail = async (data) => {
  try {
    const transporter = createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 587,
      secure: false,

      auth: {
        user: process.env.NODEMAILER_EMAIL,
        pass: process.env.APP_PASSWORD,
      },
    });

    const info = await transporter.sendMail({
      from: process.env.NODEMAILER_EMAIL,
      to: data.email,

      subject: data.subject,

      text: `Someone invited you to submit a form. Link: ${data.link}`,

      html: generateInvitationHTMLString(data),
    });

    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const createForm = async (req, res, token) => {
  const { accountId } = token;

  if (!accountId) {
    return await res.status(403).json({ message: "" });
  }

  const { body } = req;

  try {
    const db = await connection();
    const createdForm = await Form.create({
      accountId: accountId,
      title: body.title,
      description: body.description,
      questions: body.questions,

      receivedAnswers: [],

      createdAt: body.createdAt,
      updatedAt: body.updatedAt,
    });

    return await res.status(200).json({ message: "" });
  } catch (error) {
    console.log(error);
    return await res.status(500).json({ message: "asdasd4e44" });
  }
};

export const getUniqueForm = async (id) => {
  try {
    const db = await connection();
    const found = await Form.findOne({ _id: id });
    return found;
  } catch (error) {
    return false;
  }
};

export const getAccountForms = async (token) => {
  const { accountId } = token;
  try {
    const db = await connection();
    const forms = await Form.find({ accountId: accountId });
    return forms;
  } catch (error) {
    return false;
  }
};

export const updateUniqueForm = async (req, res) => {
  try {
    const { body } = req;
    const db = await connection();
    const filter = { _id: req.query.formId };
    const update = {
      title: body.title,
      description: body.description,
      questions: body.questions,
      updatedAt: new Date(body.updatedAt),
      submissions: body.submissions,
    };

    const updatedForm = await Form.findOneAndUpdate(filter, update, {
      new: true,
    });
    return await res.status(200).json({ message: "" });
  } catch (error) {
    console.log(error);
    return await res.status(500).json({ message: "" });
  }
};

export const deleteUniqueForm = async (req, res) => {
  try {
    const db = await connection();
    await Form.findOneAndDelete({ _id: req.query.formId });
    return await res.status(200).json({ message: "" });
  } catch (error) {
    return await res.status(500).json({ message: "" });
  }
};

export const addNewSubmission = async (req, res) => {
  try {
    const db = await connection();
    const found = await Form.findOne({ _id: req.query.formId });
    const filter = { _id: req.query.formId };
    const update = {
      submissions: [...found.submissions, req.body],
    };

    await Form.findOneAndUpdate(filter, update, { new: true });

    return await res.status(200).json({ message: "" });
  } catch (error) {
    return await res.status(500).json({ message: "" });
  }
};

export const sendFormInvitation = async (req, res, token) => {
  try {
    const { accountId } = token;
    const db = await connection();
    const found = await Account.findOne({ _id: accountId });

    if (!found) {
      return await res.status(404).json({ message: "" });
    }

    const data = {
      email: req.body.email,
      subject: req.body.subject,
      message: req.body.message,
      accountFullName: found.fullname,
      link: generateSubmitFormLink(req.query.formId),
    };

    const submitted = await sendEmail(data);

    if (!submitted) {
      return await res.status(500).json({ message: "" });
    }

    return await res.status(200).json({ message: "" });
  } catch (error) {
    return await res.status(500).json({ message: "" });
  }
};
