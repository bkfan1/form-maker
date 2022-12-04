import connection from "../../database/connection";
import Form from "../../database/models/form";

import ConsumerForm from "../../components/ConsumerForm";

export default function SubmitFormPage({ form }) {
  return (
    <>
      <main className="flex flex-col items-center justify-center min-h-screen">
        <ConsumerForm formData={form} />
      </main>
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
