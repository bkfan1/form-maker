import { nanoid } from "nanoid";
import { useContext } from "react";
import { FormEditorContext } from "../contexts/FormEditorContext";
import { useRouter } from "next/router";
import axios from "axios";

export default function FormEditorActionsMenu() {
  const router = useRouter();
  const { pathname } = router;

  const { formData, dispatch, previewForm, setPreviewForm } =
    useContext(FormEditorContext);

  const handleAddNewQuestion = () => {
    const newQuestion = {
      id: nanoid(),
      title: "Untitled question",
      option: "shortAnswer",
      inputData: {
        type: "text",
        minLength: 0,
        maxLength: 100,
      },

      required: false,
    };

    return dispatch({ type: "ADD_NEW_QUESTION", payload: { newQuestion } });
  };

  const handleCreateForm = async () => {
    const data = { ...formData, updatedAt: new Date() };

    try {
      const res = await axios.post(`/api/account/forms/`, data);
      console.log(res.status);
    } catch (error) {
      console.warn("error!");
    }
  };

  const handleUpdateForm = async () => {
    const data = { ...formData, updatedAt: new Date() };

    try {
      const res = await axios.put(`/api/account/forms/${formData.id}`, data);
      console.log(res.status);
    } catch (error) {
      console.warn("error!");
    }
  };

  const handleDeleteForm = async () => {
    try {
      const res = await axios.delete(`/api/account/forms/${formData.id}`);
      console.log(res.status);
      router.push("/user/forms/view");
    } catch (error) {
      console.warn("error!");
    }
  };

  return (
    <>
      <menu className="flex flex-col gap-2 p-2 border rounded bg-white shadow-md">
        {previewForm && (
          <button
            onClick={() => setPreviewForm(!previewForm)}
            className="text-xl"
            title="Back to edit mode"
          >
            <i className="bi bi-eye" />
          </button>
        )}
        {!previewForm && (
          <>
            <button
              onClick={handleAddNewQuestion}
              title="Add new question"
              className="text-xl"
            >
              <i className="bi bi-plus-circle" />
            </button>

            {pathname === "/user/forms/add" && (
              <>
                <button
                  onClick={handleCreateForm}
                  title="Create form"
                  className="text-xl"
                >
                  <i className="bi bi-check-circle" />
                </button>
              </>
            )}

            {formData.questions.length > 0 && (
              <button
                onClick={() => setPreviewForm(!previewForm)}
                className="text-xl"
                title="Preview form"
              >
                <i className="bi bi-eye" />
              </button>
            )}

            {pathname === "/user/forms/edit/[formId]" && (
              <>
                <button onClick={handleUpdateForm} className="text-xl">
                  <i className="bi bi-arrow-up-circle" title="Update form" />
                </button>

                <button className="text-xl">
                  <i className="bi bi-send" title="Publish form" />
                </button>

                <button onClick={handleDeleteForm} className="text-xl">
                  <i className="bi bi-x-circle" title="Delete form" />
                </button>
              </>
            )}
          </>
        )}
      </menu>
    </>
  );
}
