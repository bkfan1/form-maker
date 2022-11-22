import Link from "next/link";

export default function FormCard({ data }) {
  const { id, title, updatedAt } = data;
  return (
    <>
      <figure className="ease-in-out duration-150 w-38 bg-white border rounded shadow-sm hover:shadow-md">
        <Link href={`/user/forms/edit/${id}`}>
          <div className="h-48 bg-gray-500"></div>
        </Link>

        <section className="flex flex-col gap-1 p-2">
          <h1 className="text-gray-800 font-bold">{title}</h1>

          <div className="flex justify-between items-center">
            <div className="flex gap-1 text-sm text-gray-500">
              <i className="bi bi-file-earmark-text-fill text-xl text-indigo-800" />
              <div className="flex flex-col">
                <p className="">Last update:</p>
                <p>{new Date(updatedAt).toLocaleDateString()}</p>
              </div>
            </div>
            <ul className="self-end">
              <li>
                <button>
                  <i className="bi bi-three-dots-vertical" />
                </button>
              </li>
            </ul>
          </div>
        </section>
      </figure>
    </>
  );
}
