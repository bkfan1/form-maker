import { useRouter } from "next/router";
import { useContext } from "react";
import { SearchContext } from "../../contexts/SearchContext";

import SubMenu from "../SubMenu";

export default function Navbar() {
  const router = useRouter();
  const { pathname } = router;

  const { handleSearchOnChange } = useContext(SearchContext);

  return (
    <>
      <nav className="navBar flex items-center justify-between w-full p-4 bg-white shadow-md">
        <figure
          title="Form Maker App"
          onClick={() => router.push("/")}
          className="flex items-center gap-1 w-fit hover:cursor-pointer"
        >
          <i className="bi bi-file-earmark-text-fill text-2xl text-indigo-800" />
          <h1 className="font-bold text-gray-600">Form Maker</h1>
        </figure>

        {pathname === "/user/forms/view" && (
          <>
            <form className={`flex gap-2 px-1 rounded-full bg-gray-300`}>
              <button
                className="p-2 rounded-full hover:opacity-80"
                title="Search"
              >
                <i className="bi bi-search" />
              </button>
              <input
                type="text"
                title="Search by term"
                placeholder="Search form by title or id"
                className="customInput pr-4 bg-transparent"
                onChange={(e) => handleSearchOnChange(e)}
              />
            </form>
          </>
        )}

        {pathname === "/user/forms/view" ||
        pathname === "/user/forms/add" ||
        pathname === "/user/forms/edit/[formId]" ||
        pathname === "/user/settings" ? (
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
