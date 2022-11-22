import FormEditorWrapper from "../../../../components/FormEditorWrapper";
import Layout from "../../../../components/ui/Layout";
import { FormEditorProvider } from "../../../../contexts/FormEditorContext";
import { verifyTokenServerSide } from "../../../../middlewares/authentication/jwt";

export default function AddNewFormPage() {
  return (
    <>
      <FormEditorProvider>
        <Layout>
          <main className="flex flex-col items-center min-h-screen py-8">
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

  return {
    props: {},
  };
}
