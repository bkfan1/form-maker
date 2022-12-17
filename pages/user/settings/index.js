import { verifyTokenServerSide } from "../../../middlewares/authentication/jwt";
import { useState } from "react";

import Layout from "../../../components/ui/Layout";

import ChangeAccountEmailForm from "../../../components/forms/ChangeAccountEmailForm";
import ChangeAccountPasswordForm from "../../../components/forms/ChangeAccountPasswordForm";

import { nanoid } from "nanoid";

const btns = [
  {
    id: nanoid(),
    name: "email",
    text: "Email",
  },
  {
    id: nanoid(),
    name: "password",
    text: "Password",
  },
];

export default function UserSettingsPage() {
  const [section, setSection] = useState("email");
  return (
    <>
      <Layout>
        <main className="flex flex-col items-center justify-center min-h-screen">
          <section className="flex flex-col items-center justify-center gap-4 w-full">
            <header>
              <menu className="flex gap-4 w-fit p-2 border rounded bg-white">
                {btns.map((btn) => (
                  <button
                    onClick={() => setSection(btn.name)}
                    key={btn.id}
                    className={`border-b-2 ${
                      section === btn.name && " border-b-indigo-800"
                    }`}
                  >
                    {btn.text}
                  </button>
                ))}
              </menu>
            </header>

            {section === "email" && <ChangeAccountEmailForm />}
            {section === "password" && <ChangeAccountPasswordForm />}
          </section>
        </main>
      </Layout>
    </>
  );
}

export async function getServerSideProps(ctx) {
  const token = await verifyTokenServerSide(ctx);

  if (!token) {
    return { redirect: { destination: "/login", permanent: false } };
  }

  return {
    props: {},
  };
}
