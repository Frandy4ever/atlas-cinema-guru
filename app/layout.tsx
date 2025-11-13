import { auth } from "@/auth";
import { Sidebar } from "@/components/sidebar";
import { Header } from "@/components/header";
import { ActivityFeed } from "@/components/activity-feed";
import "./global.css";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  return (
    <html lang="en">
      <body style={{ backgroundColor: 'hsl(240, 100%, 12%)' }} className="text-white">
        {session ? (
          <div className="flex h-screen">
            <Sidebar activityFeed={<ActivityFeed />} />
            <div className="flex-1 flex flex-col">
              <Header user={session.user || {}} />
              <main className="flex-1 overflow-auto p-6" style={{ backgroundColor: 'hsl(240, 100%, 12%)' }}>
                {children}
              </main>
            </div>
          </div>
        ) : (
          children
        )}
      </body>
    </html>
  );
}