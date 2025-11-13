import { signOut } from "@/auth";
import Image from "next/image";
import { LogOut } from "lucide-react";

interface HeaderProps {
  user: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
}

export function Header({ user }: HeaderProps) {
  return (
    <header className="bg-[#54f4d0] px-6 py-4 flex justify-between items-center">
      <div className="flex items-center space-x-4">
        <Image
          src="/logo.png"
          alt="Cinema Guru"
          width={40}
          height={40}
          className="rounded"
        />
        <h1 className="text-xl font-bold text-black">Cinema Guru</h1>
      </div>
      
      <div className="flex items-center space-x-4">
        <span className="text-black font-medium">{user.email || "User"}</span>
        <form
          action={async () => {
            "use server";
            await signOut();
          }}
        >
          <button
            type="submit"
            className="bg-black hover:bg-gray-800 px-4 py-2 rounded-lg text-white font-semibold transition-colors flex items-center gap-2"
          >
            <LogOut size={18} />
            Logout
          </button>
        </form>
      </div>
    </header>
  );
}