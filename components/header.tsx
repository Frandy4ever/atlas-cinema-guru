import { signOut } from "@/auth";
import Image from "next/image";

interface HeaderProps {
  user: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
}

export function Header({ user }: HeaderProps) {
  return (
    <header className="bg-gray-800 border-b border-gray-700 px-6 py-4 flex justify-between items-center">
      <div className="flex items-center space-x-4">
        <Image
          src="/logo.png"
          alt="Cinema Guru"
          width={40}
          height={40}
          className="rounded"
        />
        <h1 className="text-xl font-bold text-green-400">Cinema Guru</h1>
      </div>
      
      <div className="flex items-center space-x-4">
        <span className="text-gray-300">{user.email || "User"}</span>
        <form
          action={async () => {
            "use server";
            await signOut();
          }}
        >
          <button
            type="submit"
            className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded text-white"
          >
            Sign Out
          </button>
        </form>
      </div>
    </header>
  );
}