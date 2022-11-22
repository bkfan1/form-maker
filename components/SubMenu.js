import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
import SubMenuItem from "./SubMenuItem";

export default function SubMenu() {
  const router = useRouter();
  const [viewMenu, setViewMenu] = useState(false);

  const handleOnClickLogOut = async()=>{
    try {
      const res = await axios.delete('/api/auth/logout');
      console.log(res)
      router.push('/login');
    } catch (error) {
      console.warn("error!")
    }

  }

  return (
    <>
      <ul className="relative">
        <li onClick={() => setViewMenu(!viewMenu)}>
          <button className="">
            <i className={`bi bi-grid-3x3-gap-fill text-xl ${viewMenu ? 'text-black' : 'text-gray-500'}`}/>
          </button>
        </li>
        {viewMenu === true && (
          <>
            <menu className="absolute left-[-120px] p-2 border rounded bg-white shadow-md">
              <header className="py-2">
                <figure className="flex gap-2">
                  <i className="bi bi-person-circle" />
                  <p>Person name</p>
                </figure>
              </header>
              <section className="subMenu__section flex flex-col gap-2 py-2 border-t-2 border-b-2">
                <SubMenuItem icon="bi bi-gear" title="Settings" />
                <div onClick={handleOnClickLogOut}>
                <SubMenuItem icon={"bi bi-box-arrow-right"} title="Log out"/>
                </div>
              </section>
            </menu>
          </>
        )}
      </ul>
    </>
  );
}
