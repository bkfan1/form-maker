import { useForm } from "react-hook-form";
import { email } from "../../utils/regex";
import FieldErrorMessage from "../FieldErrorMessage";
import axios from "axios";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import { AccountNameContext } from "../../contexts/AccountNameContext";
import { notify } from "../../utils/toasts";

export default function LoginForm() {
  const router = useRouter();
  const { setName } = useContext(AccountNameContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [submitted, setSubmitted] = useState(false);

  const onSubmit = async (data) => {
    setSubmitted(true);
    try {
      const res = await axios.post("/api/auth/login", data);
      setName(res.data.accountName);
      notify("success", "Logged successfully.");

      router.push("/user/forms/view");
    } catch (error) {
      const { response } = error;
      notify("error", response.data.message);
      setTimeout(()=>{
        setSubmitted(false);
      }, 2000);
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        disabled={submitted ? true : false}
        className={`flex flex-col gap-4 w-80 p-2 border rounded bg-white`}
      >
        <section className={`flex flex-col gap-2 ${submitted ? 'opacity-70' : ""}`}>
          <fieldset className="flex flex-col">
            <input
              type="email"
              {...register("email", {
                pattern: { value: email, message: "Type a valid email." },
                required: { value: true, message: "This field is required." },
              })}
              placeholder="Email"
              className="customInput p-1 border-2 rounded focus:border-indigo-800"
              disabled={submitted ? true : false}
            />
            {errors.fullname && (
              <FieldErrorMessage message={errors.email.message} />
            )}
          </fieldset>

          <fieldset className="flex flex-col">
            <input
              type="password"
              {...register("password", {
                required: { value: true, message: "This field is required." },
                minLength: {
                  value: 8,
                  message: "Password needs to be at least 8 characters long.",
                },
              })}
              placeholder="Password"
              className="customInput p-1 border-2 rounded focus:border-indigo-800"
              disabled={submitted ? true : false}
            />
            {errors.password && (
              <FieldErrorMessage message={errors.password.message} />
            )}
          </fieldset>
        </section>

        <input type="submit" hidden disabled={submitted ? true : false} />

        <button
          disabled={submitted ? true : false}
          className={`ease-in-out duration-100 p-2 rounded text-white bg-indigo-800  ${submitted ? "opacity-70" : "hover:opacity-90"}`}
        >
          Login
        </button>
      </form>
    </>
  );
}
