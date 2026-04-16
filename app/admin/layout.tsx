import Sidebar from '@/components/sidebar/sidebar';

export default function AdminLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <section className="min-h-screen flex gap-4">
      {/* sidebar */}
      <aside className="w-64 border-r">
        <Sidebar />
      </aside>

      {/* main content */}
      <main className="flex-1 p-4">{children}</main>
    </section>
  );
}
