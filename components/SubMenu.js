import { useContext, useState } from "react";
import { useRouter } from "next/router";
import { AccountNameContext } from "../contexts/AccountNameContext";
import SubMenuItem from "./SubMenuItem";
import axios from "axios";

export default function SubMenu() {
  const router = useRouter();
  const {pathname} = router;
  const { name } = useContext(AccountNameContext);
  const [viewMenu, setViewMenu] = useState(false);
  const goToRoute = (route) => {
    return router.push(route);
  };

  const handleOnClickLogOut = async () => {
    const ls = localStorage;
    try {
      const res = await axios.delete("/api/auth/logout");
      ls.removeItem('account-name');
      console.log(res);
      router.push("/login");
    } catch (error) {
      console.warn("error!");
    }
  };

  return (
    <>
      <ul className="relative">
        <li onClick={() => setViewMenu(!viewMenu)}>
          <button className="">
            <i
              className={`ease-in-out duration-150 bi bi-grid-3x3-gap-fill text-xl ${
                viewMenu ? "text-black" : "text-gray-500"
              }`}
            />
          </button>
        </li>
        {viewMenu === true && (
          <>
            <menu className="absolute left-[-175px] w-48 p-2 border rounded bg-white shadow-md">
              <header className="flex gap-2 py-2">
                <i className="bi bi-person-circle" />
                <p>{name}</p>
              </header>
              <section className="subMenu__section flex flex-col gap-2 py-2 border-t-2 border-b-2">
                {pathname !== "/user/forms/view" ? <SubMenuItem icon={'bi bi-file-earmark-text'} title="My forms" action={()=> goToRoute("/user/forms/view")} /> : ""}
                <SubMenuItem
                  icon="bi bi-gear"
                  title="Settings"
                  action={() => goToRoute("/user/settings")}
                />
                <div>
                  <SubMenuItem
                    icon={"bi bi-box-arrow-right"}
                    title="Log out"
                    action={handleOnClickLogOut}
                  />
                </div>
              </section>
            </menu>
          </>
        )}
      </ul>
    </>
  );
}
