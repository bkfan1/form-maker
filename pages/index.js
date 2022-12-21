import Link from "next/link";
import { verifyTokenServerSide } from "../middlewares/authentication/jwt";
import imagesList from "../utils/images/appShowcase";
import Image from "next/image";
import Modal from "../components/Modal";
import { useContext, useState } from "react";
import { ModalWindowContext } from "../contexts/ModalWindowContext";
import { nanoid } from "nanoid";

const btns = [
  { id: nanoid(), text: "Gallery", icon: "bi bi-images", url: "#gallery" },
  { id: nanoid(), text: "Source code", icon: "bi bi-github", url: "https://www.github.com/bkfan1/form-maker" },

  
];

export default function Home() {
  const { handleCloseClick } = useContext(ModalWindowContext);
  const [currentViewingImage, setCurrentViewingImage] = useState(null);
  return (
    <>
      <main className="flex flex-col items-center justify-center min-h-screen bg-white">
        <section className="homeSection flex flex-col justify-center gap-4 w-full min-h-screen px-12 bg-indigo-800 ">
          <header className="self-center flex flex-col items-center justify-center gap-2">
            <h1 className="text-4xl font-bold text-white">
              <i className="bi bi-file-earmark-text-fill" /> Form Maker
            </h1>
            <p className="text-white">Create and share online forms.</p>
            <menu className="flex gap-4">
              <Link href="/register">
                <button className="ease-in-out duration-100 p-2 text-indigo-800 font-bold  border rounded bg-white hover:opacity-70">
                  Register
                </button>
              </Link>
              <Link href="/login">
                <button className="ease-in-out duration-100 p-2 text-white border rounded border-white hover:opacity-70">
                  Login
                </button>
              </Link>
            </menu>
          </header>

          <menu className="flex self-center gap-4 py-4">
            {btns.map((btn)=>
            <Link key={btn.id} href={btn.url}>
              <button className="ease-in-out duration-100 flex gap-1 text-white hover:opacity-70">
                <i className={`${btn.icon}`}/>
                <span>{btn.text}</span>
              </button>
            </Link>)}
          </menu>
        </section>

        <section id="gallery" className="gallery flex flex-col justify-center gap-4 w-full min-h-screen px-12 bg-gray-100">
          <header className="text-center">
            <h1 className="text-4xl font-bold text-indigo-800">Gallery</h1>
          </header>

          <div
            title="Click to see the full image"
            className="grid grid-cols-3 gap-4 h-96 overflow-y-scroll hideScrollbar "
          >
            {imagesList.map((img, index) => (
              <div
                key={img.id}
                className="ease-in-out duration-100 relative h-64 hover:cursor-pointer hover:opacity-70"
              >
                <Image
                  src={img.src}
                  alt={`App showcase image with id:${img.id}`}
                  objectFit="cover"
                  fill
                  className="shadow-lg"
                  onClick={() => {
                    setCurrentViewingImage(img);
                    handleCloseClick();
                  }}
                />
              </div>
            ))}
            <Modal>
              {currentViewingImage ? (
                <Image
                  src={currentViewingImage.src}
                  quality={100}
                  width={800}
                  height={800}
                  alt="Current viewing image"
                />
              ) : (
                ""
              )}
            </Modal>
          </div>
        </section>
      </main>
    </>
  );
}

export async function getServerSideProps(ctx) {
  const token = verifyTokenServerSide(ctx);

  if (token) {
    return { redirect: { destination: "/user/forms/view", permanent: false } };
  }

  return {
    props: {},
  };
}
