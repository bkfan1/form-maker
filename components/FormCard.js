import Link from "next/link";

export default function FormCard({}) {
  //const {title, description} = data;
  return (
    <>
      <figure className="ease-in-out duration-150 w-64 bg-white border rounded shadow-sm hover:shadow-md">
        <Link href="/">
          <div className="w-full h-48 bg-gray-500"></div>
        </Link>

        <section className="flex flex-col gap-2 p-2">
          <h1 className="text-gray-800 font-bold">Form title</h1>

          <div className="flex justify-between items-center">
            <p className="text-sm text-gray-500">
              <i className="bi bi-calendar-fill" /> Creation date
            </p>
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
