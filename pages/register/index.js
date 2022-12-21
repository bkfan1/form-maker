import Link from "next/link";
import AppEmblem from "../../components/ui/AppEmblem";
import RegisterForm from "../../components/forms/RegisterForm";
import { verifyTokenServerSide } from "../../middlewares/authentication/jwt";
import Footer from "../../components/ui/Footer";

export default function RegisterPage() {
  return (
    <>
      <main className="flex flex-col items-center justify-center gap-4 min-h-screen">
        <AppEmblem />
        <div className="flex flex-col gap-2">
          <RegisterForm />
          <Link href="/login">
            <span className="text-sm text-blue-500">Log In</span>{" "}
          </Link>
        </div>
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
