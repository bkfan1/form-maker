import { useForm } from "react-hook-form";

import axios from "axios";
import { email } from "../../utils/regex";
import FieldErrorMessage from "../FieldErrorMessage";
import { notify } from "../../utils/toasts";

export default function ChangeAccountEmailForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const res = await axios.put("/api/account/email", data);
      notify("success", "Email updated successfully.");
    } catch (error) {
      console.warn(error);
      const { response } = error;
      notify("error", response.data.message);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-xs">
        <div className="flex flex-col gap-2">
          <label className="flex flex-col">
            <input
              type="email"
              placeholder="New email"
              className="customInput p-1 border-2 rounded focus:border-indigo-800"
              {...register("newEmail", {
                required: { value: true, message: "This field is required." },
                pattern: { value: email, message: "Type a valid email." },
              })}
            />
            {errors.newEmail && (
              <FieldErrorMessage message={errors.newEmail.message} />
            )}
          </label>

          <label className="flex flex-col">
            <input
              type="email"
              placeholder="Confirm new email"
              className="customInput p-1 border-2 rounded focus:border-indigo-800"
              {...register("confirmNewEmail", {
                required: { value: true, message: "This field is required." },
                pattern: { value: email, message: "Type a valid email." },
              })}
            />
            {errors.confirmNewEmail && (
              <FieldErrorMessage message={errors.confirmNewEmail.message} />
            )}
          </label>

          <button className="ease-in-out duration-100 w-full mt-2 py-2 text-white bg-indigo-800 rounded hover:opacity-80 ">
            Update
          </button>
        </div>
      </form>
    </>
  );
}
