import AdminPanelLayout from "@/components/admin-panel/admin-panel-layout";

interface ForumLayoutProps {
  children: React.ReactNode;
}

export default function ForumLayout({ children }: ForumLayoutProps) {
  return <AdminPanelLayout>{children}</AdminPanelLayout>;
}
