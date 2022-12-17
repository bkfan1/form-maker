import Link from "next/link";

export default function AppEmblem() {
  return (
    <>
      <Link href="/">
        <figure className="flex flex-col gap-2 items-center justify-center">
          <i className="bi bi-file-earmark-text-fill text-4xl text-indigo-800" />
          <h1 className="font-bold text-xl">Form Maker</h1>
        </figure>
      </Link>
    </>
  );
}
