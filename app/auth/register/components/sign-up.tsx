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
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-center gap-2">
              <div className="grid gap-2">
                <Label>Fullname</Label>
                <Input
                  id="fullname"
                  type="text"
                  placeholder="Input fullname here..."
                  required
                  {...register('fullName')}
                  className="rounded-2xl"
                />
                <p className=" text-xs text-red-500">
                  {errors.fullName?.message}
                </p>
              </div>
              <div className="grid gap-2">
                <Label>Username</Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="Input username here..."
                  required
                  {...register('userName')}
                  className="rounded-2xl"
                />
                <p className=" text-xs text-red-500">
                  {errors.userName?.message}
                </p>
              </div>
            </div>

            <div className="grid gap-2">
              <Label className="text-sm">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="example@gmail.com"
                required
                {...register('email')}
                className="rounded-2xl"
              />
              <p className=" text-xs text-red-500">{errors.email?.message}</p>
            </div>
            <div className="grid gap-2">
              <Label className="text-sm">Password</Label>
              <Input
                id="password"
                type="password"
                required
                {...register('password')}
                className="rounded-2xl"
              />
              <p className=" text-xs text-red-500">
                {errors.password?.message}
              </p>
            </div>
            <div className="grid gap-2">
              <Label className="text-sm">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                required
                {...register('confirmPassword')}
                className="rounded-2xl"
              />
              <p className="text-xs text-red-500">
                {errors.confirmPassword?.message}
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-2 mt-4">
            <Button
              className="rounded-2xl"
              type="submit"
              size="sm"
              disabled={isPendingRegister}
            >
              Sign Up
            </Button>
            <Button className="rounded-2xl" size="sm" variant="outline">
              Sign Up with Google
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
