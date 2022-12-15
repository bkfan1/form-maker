import { useState } from "react";
import connection from "../../database/connection";
import Form from "../../database/models/form";

import ConsumerForm from "../../components/forms/ConsumerForm";
import Footer from "../../components/ui/Footer";

export default function SubmitFormPage({ form }) {
  const [submitted, setSubmitted] = useState(false);

  return (
    <>
      <main className="flex flex-col items-center justify-center min-h-screen">
        {submitted ? (
          <figure className="flex flex-col items-center justify-center gap-2 w-64 h-64 p-2 border rounded shadow-md bg-white">
            <div className="flex items-center justify-center w-12 h-12 p-2 rounded-full bg-green-500">
              <i className="bi bi-check-circle text-2xl text-white" />
            </div>
            <p className="text-center font-bold">Your answer has been submitted.</p>
          </figure>
        ) : (
          <ConsumerForm formData={form} setSubmitted={setSubmitted} />
        )}
      </main>
      <Footer/>
    </>
  );
}

export async function getServerSideProps(ctx) {
  const db = await connection();

  const found = await Form.findOne({ _id: ctx.params.formId }).lean();
  const { _id, title, description, questions } = found;
  const form = { id: `${_id}`, title, description, questions };

  return {
    props: {
      form,
    },
  };
}
