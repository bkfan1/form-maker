import axios from "axios";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { FormEditorContext } from "../../contexts/FormEditorContext";
import { email } from "../../utils/regex";
import { notify } from "../../utils/toasts";
import FieldErrorMessage from "../FieldErrorMessage";

export default function SendInvitationForm() {
  const { formData } = useContext(FormEditorContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    try {
      const res = await axios.post(
        `/api/account/forms/sendInvitation/${formData.id}`,
        data
      );
      notify('success', 'Invitation sent successfully.')
    } catch (error) {
      const {response} = error;
      notify('error', response.data.message);
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
        <h3 className="">Send email</h3>
        <section className="flex flex-col gap-4">
          <fieldset className="flex flex-col gap-2">
            <label>To</label>
            <input
              type="text"
              placeholder="Enter an email"
              className="customInput p-1 border-2 rounded focus:border-indigo-800"
              {...register("email", {
                required: { value: true, message: "This field is required." },
                pattern: { value: email, message: "Type a valid email." },
              })}
            />
            {errors.email && (
              <FieldErrorMessage message={errors.email.message} />
            )}
          </fieldset>

          <fieldset className="flex flex-col gap-2">
            <label>Subject</label>
            <input
              type="text"
              className="customInput p-1 border-2 rounded focus:border-indigo-800"
              {...register("subject", {
                required: { value: true, message: "This field is required." },
              })}
            />
            {errors.subject && (
              <FieldErrorMessage message={errors.subject.message} />
            )}
          </fieldset>

          <fieldset className="flex flex-col gap-2">
            <label>Message</label>
            <input
              type="text"
              className="customInput p-1 border-2 rounded focus:border-indigo-800"
              {...register("message", { required: { value: false } })}
            />
          </fieldset>
        </section>

        <button className="ease-in-out duration-100 p-2  text-white border rounded bg-indigo-800 hover:opacity-90">
          Send
        </button>
      </form>
    </>
  );
}
