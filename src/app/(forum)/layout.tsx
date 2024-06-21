import AdminPanelLayout from "@/components/admin-panel/admin-panel-layout";
import { auth } from "../../../auth";
import { redirect } from "next/navigation";
import { SessionProvider } from "next-auth/react";

interface ForumLayoutProps {
  children: React.ReactNode;
}

export default async function ForumLayout({ children }: ForumLayoutProps) {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  return (
    <SessionProvider session={session}>
      <AdminPanelLayout>{children}</AdminPanelLayout>
    </SessionProvider>
  );
}
