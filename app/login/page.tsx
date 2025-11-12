import { auth, signIn } from "@/auth";
import { redirect } from "next/navigation";
import Image from "next/image";

export default async function LoginPage() {
  const session = await auth();

  if (session) {
    redirect("/");
  }

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg max-w-md w-full">
        <div className="text-center mb-8">
          <Image
            src="/logo.png"
            alt="Cinema Guru"
            width={80}
            height={80}
            className="mx-auto mb-4 rounded"
          />
          <h1 className="text-3xl font-bold text-green-400 mb-2">
            Cinema Guru
          </h1>
          <p className="text-gray-400">
            Track your favorite movies and build your watchlist
          </p>
        </div>

        <form
          action={async () => {
            "use server";
            await signIn("github");
          }}
          className="space-y-4"
        >
          <button
            type="submit"
            className="w-full bg-gray-700 hover:bg-gray-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2"
          >
            <span>Sign in with GitHub</span>
          </button>
        </form>
      </div>
    </div>
  );
}