import LoginForm from "../../components/forms/LoginForm";
import { verifyTokenServerSide } from "../../middlewares/authentication/jwt";

export default function LoginPage() {
  return (
    <>
      <main className="flex flex-col items-center justify-center min-h-screen">
        <LoginForm />
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
