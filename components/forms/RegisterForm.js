import { useForm } from "react-hook-form";
import { email, fullname } from "../../utils/regex";
import FieldErrorMessage from "../FieldErrorMessage";
import axios from "axios";
import { notify } from "../../utils/toasts";

export default function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const res = await axios.post("/api/register", data);
      notify("success", "Registered successfully").console.log(res);
    } catch (error) {
      const { response } = error;
      notify("error", response.data.message);
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 w-80 p-2 border rounded bg-white"
      >
        <section className="flex flex-col gap-2">
          <fieldset className="flex flex-col">
            <input
              type="text"
              {...register("fullname", {
                pattern: { value: fullname, message: "Type a valid fullname." },
                required: { value: true, message: "This field is required." },
              })}
              placeholder="Full name"
              className="customInput p-1 border-2 rounded focus:border-indigo-800"
            />
            {errors.fullname && (
              <FieldErrorMessage message={errors.fullname.message} />
            )}
          </fieldset>

          <fieldset className="flex flex-col">
            <input
              type="email"
              {...register("email", {
                pattern: { value: email, message: "Type a valid email." },
                required: { value: true, message: "This field is required." },
              })}
              placeholder="Email"
              className="customInput p-1 border-2 rounded focus:border-indigo-800"
            />
            {errors.email && (
              <FieldErrorMessage message={errors.email.message} />
            )}
          </fieldset>

          <fieldset className="flex flex-col">
            <input
              type="password"
              {...register("password", {
                minLength: {
                  value: 8,
                  message: "Password needs to be at least 8 characters long.",
                },
                required: { value: true, message: "This field is required." },
              })}
              placeholder="Password"
              className="customInput p-1 border-2 rounded focus:border-indigo-800"
            />
            {errors.password && (
              <FieldErrorMessage message={errors.password.message} />
            )}
          </fieldset>
        </section>

        <input type="submit" hidden />

        <button className="ease-in-out duration-100 p-2 rounded text-white bg-indigo-800 hover:opacity-90">
          Register
        </button>
      </form>
    </>
  );
}
