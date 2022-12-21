import { useContext } from "react";
import { FormEditorContext } from "../contexts/FormEditorContext";
import FormEditor from "./FormEditor";
import FormEditorActionsMenu from "./FormEditorActionsMenu";
import EndUserForm from "./forms/EndUserForm";

export default function FormEditorWrapper() {

  const {formData, previewForm} = useContext(FormEditorContext);

  return (
    <div className="flex gap-4 items-center">
      {previewForm ? <EndUserForm formData={formData} /> : <FormEditor />}
      <FormEditorActionsMenu />
    </div>
  );
}
