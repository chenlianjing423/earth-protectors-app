import { toast } from "react-toastify";

export const extractErrorMessage = (
  error,
  defaultMessage = "Something went wrong",
) => {
  if (error instanceof Error) {
    return error.message;
  }
  return defaultMessage;
};

export const toastIfError = (
  error,
  defaultMessage = "Something went wrong",
) => {
  if (error instanceof Error) {
    toast.error(error.message);
    return error.message;
  }

  toast.error(defaultMessage);
  return defaultMessage;
};

export const toastIfErrorHandler =
  (defaultMessage = "Something went wrong") =>
  (error) =>
    toastIfError(error, defaultMessage);
