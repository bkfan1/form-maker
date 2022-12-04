import { useState} from "react";
import Layout from "../../../../components/ui/Layout";
import Modal from "../../../../components/Modal";
import FormEditorWrapper from "../../../../components/FormEditorWrapper";
import ShareFormMethodsContainer from "../../../../components/ShareFormMethodsContainer";
import SubmissionsTable from "../../../../components/SubmissionsTable";
import { FormEditorProvider } from "../../../../contexts/FormEditorContext";
import { verifyTokenServerSide } from "../../../../middlewares/authentication/jwt";
import { getUniqueForm } from "../../../../middlewares/forms";
import { nanoid } from "nanoid";

const sections = [
  { id: nanoid(), name: "questions", btnText: "Questions" },
  { id: nanoid(), name: "answers", btnText: "Answers" },
];

export default function EditFormPage({ form }) {
  const [section, setSection] = useState("questions");
  return (
    <>
      <FormEditorProvider initialFormData={form}>
        <Layout>
          <main className="flex flex-col items-center gap-2 py-8 min-h-screen">
            <header className="flex gap-4 p-2 border rounded bg-white">
              {sections.map(({ id, name, btnText }) => (
                <button
                  key={id}
                  className={`ease-in-out duration-150 border-b-2 ${
                    section === name ? "border-b-indigo-800" : ""
                  }`}
                  onClick={() => setSection(name)}
                >
                  {btnText}
                </button>
              ))}
            </header>
            {section === "questions" && (
              <>
                <FormEditorWrapper />
                <Modal>
                  <ShareFormMethodsContainer />
                </Modal>
              </>
            )}

            {section === "answers" && (
              <>
                {form.submissions.length >= 1 ? <SubmissionsTable/> : (
                  <figure>
                    Your form has not received submissions yet.
                  </figure>
                )}
              </>
            ) }
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

  let rawForm = await getUniqueForm(ctx.params.formId);

  const { _id, title, description, questions, submissions } = rawForm;

  const form = { id: `${_id}`, title, description, questions, submissions };

  if (!form) {
    return { redirect: { destination: "/404", permanent: false } };
  }

  return {
    props: {
      form,
    },
  };
}
