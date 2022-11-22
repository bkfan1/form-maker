import FormEditorWrapper from "../../../../components/FormEditorWrapper";
import Layout from "../../../../components/ui/Layout";
import { FormEditorProvider } from "../../../../contexts/FormEditorContext";
import { verifyTokenServerSide } from "../../../../middlewares/authentication/jwt";
import { getUniqueForm } from "../../../../middlewares/forms";

export default function EditFormPage({ form }) {
  return (
    <>
      <FormEditorProvider initialFormData={form}>
        <Layout>
          <main className="flex flex-col items-center py-8 min-h-screen">
            <FormEditorWrapper />
          </main>
        </Layout>
      </FormEditorProvider>
    </>
  );
}

export async function getServerSideProps(ctx) {
  const token = verifyTokenServerSide(ctx);

  if (!token) {
    return { redirect: { destination: "/login", permanent: false } };
  }

  const form = await getUniqueForm(token, ctx.params.formId);

  if (!form) {
    return { redirect: { destination: "/404", permanent: false } };
  }

  return {
    props: {
      form,
    },
  };
}
