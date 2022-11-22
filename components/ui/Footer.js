import Link from "next/link";

export default function Footer() {
  return (
    <>
      <footer className="flex flex-col items-center justify-center py-2 bg-white">
        <p>
          Created by Jackson Paredes Ferranti{" "}
          <Link href="https://www.github.com/bkfan1">@bkfan1</Link>
        </p>

        <ul className="flex gap-2">
          

          <Link href="https://www.github.com/bkfan1/form-maker">
            <li>
              <i className="bi bi-github" />
            </li>
          </Link>

          <Link href="mailto:jpf8296@gmail.com">
            <li>
              <i className="bi bi-envelope-fill" />
            </li>
          </Link>
        </ul>
      </footer>
    </>
  );
}
