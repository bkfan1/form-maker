import Link from "next/link";

export default function SubMenuItem({ icon, title, action }) {
  return (
    <>
      <li
        onClick={() => action()}
        className="flex gap-2 p-1 hover:bg-gray-200 hover:cursor-pointer"
      >
        <i className={icon} />
        {title}
      </li>
    </>
  );
}
