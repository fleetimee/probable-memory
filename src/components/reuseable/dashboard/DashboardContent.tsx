import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

function DashboardContent() {
  return (
    <Card className="rounded-lg border-none mt-6">
      <CardContent className="p-6">
        <div className="flex justify-center items-center min-h-[calc(100vh-56px-64px-20px-24px-56px-48px)]">
          <div className="flex flex-col relative">
            <h1 className="text-2xl font-semibold">Welcome to the Dashboard</h1>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function DashboardContentPopulated({
  title,
  content,
}: {
  title: string;
  content: string;
}) {
  return (
    <Card className="w-full">
      <CardHeader className="space-y-2">
        <CardTitle>{title}</CardTitle>
        <CardDescription>
          {content.length > 100 ? `${content.slice(0, 100)}...` : content}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          <Badge variant="outline">Beginner</Badge>
          <Badge variant="outline">JavaScript</Badge>
          <Badge variant="outline">Frontend</Badge>
          <Badge variant="outline">UI</Badge>
        </div>
      </CardContent>
    </Card>
  );
}

export { DashboardContent, DashboardContentPopulated };
