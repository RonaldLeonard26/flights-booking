'use client';

import { usePathname } from 'next/navigation';
import { SIDEBAR_ADMIN } from './sidebar-item';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Button } from '../ui/button';
import { LogOut } from 'lucide-react';
import useSignOut from '@/hooks/useSignOut';

export default function Sidebar() {
  const pathname = usePathname();
  const { signOut, isPending } = useSignOut();
  return (
    <div className="h-screen flex flex-col justify-between p-4">
      <div className="flex flex-col gap-6">
        <h2>LOGO Fly</h2>
        <div className="space-y-2">
          {SIDEBAR_ADMIN.map((item) => {
            const Icon = item.icon;
            const isActive = pathname.startsWith(item.href);

            return (
              <Link
                key={item.key}
                href={item.href}
                className={cn(
                  'flex items-center gap-2 p-2 rounded-md',
                  isActive ? 'bg-gray-600 text-white' : 'hover:bg-gray-200',
                )}
              >
                <Icon className="w-4 h-4" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>
      </div>

      <Button
        className="flex gap-2 items-center justify-center hover:bg-gray-500 hover:text-white"
        variant="ghost"
        onClick={() => signOut()}
        disabled={isPending}
      >
        <LogOut />
        {isPending ? 'Signing Out...' : 'Sign Out'}
      </Button>
    </div>
  );
}
