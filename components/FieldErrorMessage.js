export default function FieldErrorMessage({ message }) {
  return (
    <>
      <p className="py-1 text-sm text-red-500">{message}</p>
    </>
  );
}
