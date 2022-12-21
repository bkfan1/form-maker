import { useForm } from "react-hook-form";

import axios from "axios";
import FieldErrorMessage from "../FieldErrorMessage";
import { notify } from "../../utils/toasts";

export default function ChangeAccountPasswordForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const res = await axios.put("/api/account/password", data);
      console.log(res);
      notify('success', 'Password updated successfully.')
    } catch (error) {
      const {response} = error
      notify('error', response.data.message)
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-xs">
        <div className="flex flex-col gap-2">
          <label className="flex flex-col">
            <input
              type="password"
              placeholder="Current password"
              className="customInput p-1 border-2 rounded focus:border-indigo-800"
              {...register("oldPassword", {
                required: { value: true, message: "This field is required." },
                minLength: {
                  value: 8,
                  message: "Password needs to be at least 8 characters long.",
                },
              })}
            />
            {errors.oldPassword && (
              <FieldErrorMessage message={errors.oldPassword.message} />
            )}
          </label>

          <label className="flex flex-col">
            <input
              type="password"
              placeholder="New password"
              className="customInput p-1 border-2 rounded focus:border-indigo-800"
              {...register("newPassword", {
                required: { value: true, message: "This field is required." },
                minLength: {
                  value: 8,
                  message: "Password needs to be at least 8 characters long.",
                },
              })}
            />
            {errors.newPassword && (
              <FieldErrorMessage message={errors.newPassword.message} />
            )}
          </label>

          <label className="flex flex-col">
            <input
              type="password"
              placeholder="Confirm new password"
              className="customInput p-1 border-2 rounded focus:border-indigo-800"
              {...register("confirmNewPassword", {
                required: { value: true, message: "This field is required." },
                minLength: {
                  value: 8,
                  message: "Password needs to be at least 8 characters long.",
                },
              })}
            />
            {errors.confirmNewPassword && (
              <FieldErrorMessage message={errors.confirmNewPassword.message} />
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
