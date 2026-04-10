import { BookOpenText, Plane, Ticket, User } from 'lucide-react';

export const SIDEBAR_ADMIN = [
  {
    key: 'airplane',
    label: 'Airplane',
    href: '/admin/airplane',
    icon: Plane,
  },
  {
    key: 'flights',
    label: 'Flights',
    href: '/admin/flights',
    icon: BookOpenText,
  },
  {
    key: 'tickets',
    label: 'Tickets',
    href: '/admin/tickets',
    icon: Ticket,
  },
  {
    key: 'user',
    label: 'User',
    href: '/admin/user',
    icon: User,
  },
];
