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
    <header style={{ backgroundColor: 'hsl(240, 100%, 19%)' }} className="px-6 py-4 flex justify-between items-center border-b-2 border-[hsl(168,76%,47%)]">
      <div className="flex items-center space-x-4">
        <Image
          src="/logo.png"
          alt="Cinema Guru"
          width={40}
          height={40}
          className="rounded"
        />
        <h1 className="text-xl font-bold text-white">Cinema Guru</h1>
      </div>
      
      <div className="flex items-center space-x-4">
        <span className="text-white">{user.email || "User"}</span>
        <form
          action={async () => {
            "use server";
            await signOut();
          }}
        >
          <button
            type="submit"
            className="bg-[hsl(168,76%,47%)] hover:bg-[hsl(168,76%,40%)] px-6 py-2 rounded-lg text-black font-semibold transition-colors"
          >
            Sign Out
          </button>
        </form>
      </div>
    </header>
  );
}