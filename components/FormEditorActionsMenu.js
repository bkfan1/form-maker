import { useContext } from "react";
import { useRouter } from "next/router";

import { FormEditorContext } from "../contexts/FormEditorContext";
import { ModalWindowContext } from "../contexts/ModalWindowContext";

import axios from "axios";
import { nanoid } from "nanoid";
import { notify } from "../utils/toasts";

export default function FormEditorActionsMenu() {
  const router = useRouter();
  const { pathname } = router;

  const { setShowModal } = useContext(ModalWindowContext);

  const { formData, dispatch, previewForm, setPreviewForm} =
    useContext(FormEditorContext);

  const handleAddNewQuestion = () => {
    const newQuestion = {
      id: nanoid(),
      title: "Untitled question",
      option: "short-answer",

      required: false,
      inputData: {type: "text", minLength: 0, maxLength:100}
    };

    dispatch({ type: "ADD_NEW_QUESTION", payload: { newQuestion } });

  };

  const handleCreateForm = async () => {
    const data = { id: nanoid(), ...formData, updatedAt: new Date() };
    try {
      const res = await axios.post(`/api/account/forms/`, data);
      notify("success", "Form created successfully.");
    } catch (error) {
      const { response } = error;
      notify("error", response.data.message);
    }
  };

  const handleUpdateForm = async () => {
    const data = { ...formData, updatedAt: new Date() };

    try {
      const res = await axios.put(`/api/account/forms/${formData.id}`, data);
      notify("success", "Form updated successfully.");
    } catch (error) {
      const { response } = error;
      notify("error", response.data.message);
    }
  };

  const handleDeleteForm = async () => {
    try {
      const res = await axios.delete(`/api/account/forms/${formData.id}`);
      notify("success", "Form deleted sucessfully.");
      router.push("/user/forms/view");
    } catch (error) {
      const { response } = error;
      notify("error", response.data.message);
    }
  };

  return (
    <>
      <menu className="flex flex-col gap-2 p-2 text-xl border rounded bg-white shadow-md">
        <section className="flex flex-col gap-2">
          {formData.questions.length >= 1 && (
            <>
              <button
                title={previewForm ? "Back to edit mode" : "Preview form"}
                onClick={() => setPreviewForm(!previewForm)}
              >
                <i className="bi bi-eye" />
              </button>

              {pathname === "/user/forms/edit/[formId]" ? (
                <button title="Share form" onClick={() => setShowModal(true)}>
                  <i className="bi bi-share" />
                </button>
              ) : (
                ""
              )}
            </>
          )}
        </section>
        {formData.questions.length >= 1 && !previewForm ? <hr /> : ""}

        <section className="flex flex-col gap-2">
          {!previewForm && (
            <button title="Add new question" onClick={handleAddNewQuestion}>
              <i className="bi bi-plus-circle" />
            </button>
          )}

          {pathname === "/user/forms/add" && formData.questions.length >= 1 ? (
            <button onClick={handleCreateForm}>
              <i className="bi bi-check-circle" />
            </button>
          ) : (
            ""
          )}

          {pathname === "/user/forms/edit/[formId]" &&
          formData.questions.length >= 1 &&
          !previewForm ? (
            <>
              <button title="Update form" onClick={handleUpdateForm}>
                <i className="bi bi-arrow-up-circle" />
              </button>
            </>
          ) : null}

          {pathname === "/user/forms/edit/[formId]" && !previewForm ? (
            <button title="Delete form" onClick={handleDeleteForm}>
              <i className="bi bi-x-circle" />
            </button>
          ) : (
            ""
          )}
        </section>
      </menu>
    </>
  );
}
