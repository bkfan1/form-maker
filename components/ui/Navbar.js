import { useRouter } from "next/router";
import SubMenu from "../SubMenu";
export default function Navbar() {
  const router = useRouter();
  const { pathname } = router;

  return (
    <>
      <nav className="navBar flex items-center justify-between w-full p-4 bg-white shadow-md">
        <figure
          onClick={() => router.push("/")}
          className="flex items-center gap-1 w-fit hover:cursor-pointer"
        >
          <i className="bi bi-file-earmark-text-fill text-2xl text-indigo-800" />
          <h1 className="font-bold text-gray-600">Form Maker</h1>
        </figure>

        {pathname === "/user/forms/view" && (
          <>
            <form className="flex gap-2 px-1 border rounded-full bg-gray-300">
              <button className="p-2 rounded-full" title="Search">
                <i className="bi bi-search" />
              </button>
              <input
                type="text"
                placeholder="Search"
                className="customInput pr-4 bg-transparent"
              />
            </form>
          </>
        )}

        {pathname === "/user/forms/view" ||
        pathname === "/user/forms/add" ||
        pathname === "/user/forms/edit/[formId]" ? (
          <>
            <SubMenu />
          </>
        ) : (
          ""
        )}
      </nav>
    </>
  );
}
