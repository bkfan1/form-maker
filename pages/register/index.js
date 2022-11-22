import RegisterForm from "../../components/forms/RegisterForm";
import { verifyTokenServerSide } from "../../middlewares/authentication/jwt";

export default function RegisterPage() {
  return (
    <>
      <main className="flex flex-col items-center justify-center min-h-screen">
        <RegisterForm />
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
