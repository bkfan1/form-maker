import FormEditor from "./FormEditor";
import FormEditorActionsMenu from "./FormEditorActionsMenu";

export default function FormEditorWrapper() {

  return (
    <div className="flex gap-4 items-center">
      <FormEditor />
      <FormEditorActionsMenu />
    </div>
  );
}
