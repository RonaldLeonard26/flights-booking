export default function AuthLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <section className="min-h-screen mx-auto">
      {/* main content */}
      <main className="p-4">{children}</main>
    </section>
  );
}
