export default function AuthLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <section className="w-full mx-auto">
      {/* main content */}
      <main className="p-4">{children}</main>
    </section>
  );
}
