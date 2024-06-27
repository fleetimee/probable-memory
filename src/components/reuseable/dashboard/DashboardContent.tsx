import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";

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

interface DashboardContentPopulatedProps {
  title: string;
  content: string;
  url: string;
}

function DashboardContentPopulated({
  title,
  content,
  url,
}: DashboardContentPopulatedProps) {
  return (
    <Link href={url}>
      <Card className="w-full">
        <CardHeader>
          <div className="flex items-start justify-start">
            <Avatar>
              <AvatarImage
                src="https://avatars.githubusercontent.com/u/45744788?v=4"
                alt="User Avatar"
              />
              <AvatarFallback />
            </Avatar>
            <div className="ml-4">
              <CardTitle>{title}</CardTitle>
              <CardDescription>
                {content.length > 100 ? `${content.slice(0, 100)}...` : content}
              </CardDescription>
            </div>
          </div>
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
    </Link>
  );
}

export { DashboardContent, DashboardContentPopulated };
