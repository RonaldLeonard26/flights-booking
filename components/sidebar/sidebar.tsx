'use client';

import { usePathname } from 'next/navigation';
import { SIDEBAR_ADMIN } from './sidebar-item';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export default function Sidebar() {
  const pathname = usePathname();
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

      <div>Logout</div>
    </div>
  );
}
