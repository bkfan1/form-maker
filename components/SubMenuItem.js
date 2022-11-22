import Link from "next/link";

export default function SubMenuItem({ icon, title }) {
  return (
    <>
      <li
        className="flex gap-2 p-1 hover:bg-gray-200 hover:cursor-pointer"
      >
        <i className={icon} />
        {title}
      </li>
    </>
  );
}
