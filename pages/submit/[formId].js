import { getUniqueForm } from "../../middlewares/forms";
import EndUserForm from "../../components/forms/EndUserForm";
import Footer from "../../components/ui/Footer";

export default function SubmitFormPage({ form }) {
  return (
    <>
      <main className="flex flex-col items-center justify-center min-h-screen py-6">
        <EndUserForm formData={form}/>
      </main>
      <Footer />
    </>
  );
}

export async function getServerSideProps(ctx) {
  const found = await getUniqueForm(ctx.params.formId);

  if (!found) {
    return { redirect: { destination: "/404", permanent: false } };
  }

  const { _id, title, description, questions } = found;
  const form = { id: `${_id}`, title, description, questions };

  return {
    props: {
      form,
    },
  };
}
