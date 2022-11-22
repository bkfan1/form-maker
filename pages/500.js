import Link from "next/link";

export default function Error505Page(){
    return(
        <>
        <main className="flex flex-col items-center justify-center min-h-screen">

            <figure className="flex flex-col items-center justify-center gap-2 w-64">
            <i className="bi bi-file-earmark-x-fill text-indigo-800 text-4xl"/>
                <h1 className="text-xl font-bold">Something went wrong.</h1>

                <Link href="/">
                <button className="p-2 border rounded text-white bg-indigo-800">Back to app</button>
                </Link>
            </figure>

        </main>
        </>
    )
}