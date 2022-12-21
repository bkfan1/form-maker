import {toast} from "react-hot-toast";

export const notify = (type, message) => {
  switch (type) {
    case "success":
      toast.success(message);
      break;
    case "error":
      toast.error(message);
      break;

    default:
      break;
  }
};
