import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function ProfilePage() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Profile Information</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center space-x-4">
          <Avatar className="h-20 w-20">
            <AvatarImage src="/placeholder-avatar.jpg" alt="Profile picture" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="text-lg font-medium">John Doe</h3>
            <p className="text-sm text-zinc-500">john.doe@example.com</p>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Account Details</CardTitle>
        </CardHeader>
        <CardContent>
          <dl className="space-y-2">
            <div className="flex justify-between">
              <dt className="font-medium text-zinc-500">Member Since</dt>
              <dd>January 1, 2023</dd>
            </div>
            <div className="flex justify-between">
              <dt className="font-medium text-zinc-500">Subscription Plan</dt>
              <dd>Pro</dd>
            </div>
            <div className="flex justify-between">
              <dt className="font-medium text-zinc-500">Projects Created</dt>
              <dd>15</dd>
            </div>
          </dl>
        </CardContent>
      </Card>
    </div>
  );
}
