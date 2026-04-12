'use client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import useSignIn from './useSignIn';

export default function SignInPage() {
  const {
    register,
    handleSubmit,
    errors,
    handleLogin,
    isPendingLogin,
    clearErrors,
  } = useSignIn();
  return (
    <Card className=" w-full max-w-sm">
      <CardHeader>
        <CardTitle>Sign In to your account</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(handleLogin)}>
          <div className="flex flex-col gap-4">
            <div className="grid gap-2">
              <Label>Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="example@gmail.com"
                required
                {...register('email')}
                onChange={() => clearErrors()}
              />
              <p className="text-xs text-red-500">{errors.email?.message}</p>
            </div>
            <div className="grid gap-2">
              <Label>Password</Label>
              <Input
                id="password"
                type="password"
                required
                {...register('password')}
                onChange={() => clearErrors()}
              />
              <p className="text-xs text-red-500">{errors.password?.message}</p>
            </div>
          </div>
          <div className="flex flex-col gap-2 mt-4">
            <Button type="submit" size="sm" disabled={isPendingLogin}>
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
