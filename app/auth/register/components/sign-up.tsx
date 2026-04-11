'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import useSignUp from './useSignUp';

export default function SignUpPage() {
  const { register, handleSubmit, errors, handleRegister, isPendingRegister } =
    useSignUp();

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Sign Up to your account</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(handleRegister)}>
          <div className="flex flex-col gap-4">
            <div className="grid gap-2">
              <Label>Fullname</Label>
              <Input
                id="fullname"
                type="text"
                placeholder="Input fullname here..."
                required
                {...register('fullName')}
              />
              <p className="font-light text-xs">{errors.fullName?.message}</p>
            </div>
            <div className="grid gap-2">
              <Label>Username</Label>
              <Input
                id="username"
                type="text"
                placeholder="Input username here..."
                required
                {...register('userName')}
              />
              <p className="font-light text-xs">{errors.userName?.message}</p>
            </div>
            <div className="grid gap-2">
              <Label>Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="example@gmail.com"
                required
                {...register('email')}
              />
              <p className="font-light text-xs">{errors.email?.message}</p>
            </div>
            <div className="grid gap-2">
              <Label>Password</Label>
              <Input
                id="password"
                type="password"
                required
                {...register('password')}
              />
              <p className="font-light text-xs">{errors.password?.message}</p>
            </div>
            <div className="grid gap-2">
              <Label>Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                required
                {...register('confirmPassword')}
              />
              <p className="font-light text-xs">
                {errors.confirmPassword?.message}
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-2 mt-4">
            <Button type="submit" size="sm" disabled={isPendingRegister}>
              Sign Up
            </Button>
            <Button size="sm" variant="outline">
              Sign Up with Google
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
