import Link from "next/link";

export default function Footer() {
  return (
    <>
      <footer className="flex flex-col items-center justify-center py-2 bg-white">
        <p title="Author of this app">
          Created by Jackson Paredes Ferranti{" "}
          <Link href="https://www.github.com/bkfan1">@bkfan1</Link>
        </p>

        <ul className="flex gap-2">
          <Link href="https://www.github.com/bkfan1/form-maker">
            <li title="View project repository">
              <i className="bi bi-github" />
            </li>
          </Link>

          <Link href="mailto:jpf8296@gmail.com">
            <li title="Send email to @bkfan1">
              <i className="bi bi-envelope-fill" />
            </li>
          </Link>
        </ul>
      </footer>
    </>
  );
}
