import Link from "next/link";
import Footer from "../components/ui/Footer";
import { verifyTokenServerSide } from "../middlewares/authentication/jwt";

export default function Home() {
  return (
    <>
      <main className="flex flex-col items-center justify-center min-h-screen bg-white">
        <section className="homeSection flex flex-col justify-center gap-4 w-full min-h-screen px-12 bg-indigo-800 ">
          <header>
            <h1 className="text-4xl font-bold text-white">
              <i className="bi bi-file-earmark-text-fill" /> Form Maker
            </h1>
            <p className="text-white">Create and share online forms.</p>
          </header>

          <div>
            <menu className="flex gap-4">
              <Link href="/register">
                <button className="p-2 text-indigo-800 font-bold  border rounded bg-white">
                  Register
                </button>
              </Link>
              <Link href="/login">
                <button className="p-2 text-white border rounded border-white">
                  Login
                </button>
              </Link>
            </menu>
          </div>
        </section>

        <section className="flex flex-col justify-center gap-4 w-full min-h-screen px-12 bg-white">
          <header>
            <h1 className="text-4xl font-bold">Gallery</h1>
          </header>

          <div></div>
        </section>
      </main>
      <Footer />
    </>
  );
}

export async function getServerSideProps(ctx) {
  const token = verifyTokenServerSide(ctx);

  if (token) {
    return { redirect: { destination: "/user/forms/view", permanent: false } };
  }

  return {
    props: {},
  };
}
