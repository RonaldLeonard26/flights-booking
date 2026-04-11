import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function SignInPage() {
  return (
    <Card className="max-w-sm">
      <CardHeader>
        <CardTitle>Sign In to your account</CardTitle>
      </CardHeader>
      <CardContent>
        <form action="">
          <div className="flex flex-col gap-4">
            <div className="grid gap-2">
              <Label>Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="example@gmail.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label>Password</Label>
              <Input id="password" type="password" required />
            </div>
          </div>
          <div className="flex flex-col gap-2 mt-4">
            <Button type="submit" size="sm">
              Sign In
            </Button>
            <Button size="sm" variant="outline">
              Sign In with Google
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
