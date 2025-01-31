export default function AuthorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main>
      {/* Layout UI */}
      {children}
    </main>
  );
}