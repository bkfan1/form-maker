import LoginForm from "../../components/forms/LoginForm";
import { verifyTokenServerSide } from "../../middlewares/authentication/jwt";
import AppEmblem from "../../components/AppEmblem";
import Link from "next/link";

export default function LoginPage() {
  return (
    <>
      <main className="flex flex-col items-center justify-center gap-4 min-h-screen">
        <AppEmblem />
        <div className="flex flex-col gap-2">
          <LoginForm />
          <Link href="/register">
            <span className="text-sm text-blue-500">Create account</span>
          </Link>
        </div>
      </main>
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
