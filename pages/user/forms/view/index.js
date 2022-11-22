import Link from "next/link";
import FormCard from "../../../../components/FormCard";
import Layout from "../../../../components/ui/Layout";
import { verifyTokenServerSide } from "../../../../middlewares/authentication/jwt";
import { getAccountForms } from "../../../../middlewares/forms";

export default function UserFormsPage({ forms }) {
  return (
    <>
      <Layout>
        <main className="flex flex-col items-center gap-8 min-h-screen pt-8">
          <section className="flex flex-col justify-between gap-4 w-9/12">
            <header>
              <h1>Create a new form</h1>
            </header>

            <menu className="w-fit">
              <Link href={"./add"}>
                <form className="flex flex-col gap-2 w-32 h-32">
                  <button className="ease-in-out duration-100 w-full h-24 bg-white border rounded hover:shadow-md hover:text-indigo-800">
                    <i className="bi bi-plus text-4xl" />
                  </button>
                  <p>Blank</p>
                </form>
              </Link>
            </menu>
          </section>

          <section className="flex flex-col gap-4 w-9/12">
            <header>
              <h1 className="font-bold">Recently forms</h1>
            </header>

            <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-8 w-full">
              {forms.map((form) => (
                <FormCard key={form.id} data={form} />
              ))}
            </div>
          </section>
        </main>
      </Layout>
    </>
  );
}

export async function getServerSideProps(ctx) {
  const token = verifyTokenServerSide(ctx);

  if(!token){
    return {
      redirect: {destination: "/login", permanent:false}
    }
  }

  const forms = await getAccountForms(token);

  if(!forms){
    return {redirect:{destination:"/500", permanent:false}}
  }

  return {
    props: {
      forms,
    }
  }





}
