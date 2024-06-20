import AdminPanelLayout from "@/components/admin-panel/admin-panel-layout";
import { auth } from "../../../auth";

interface ForumLayoutProps {
  children: React.ReactNode;
}

export default async function ForumLayout({ children }: ForumLayoutProps) {
  const session = await auth();

  console.log(session);

  return <AdminPanelLayout>{children}</AdminPanelLayout>;
}
