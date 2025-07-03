import TheNavbar from "@/partials/TheNavbar";
import TheFooter from "@/partials/TheFooter";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <TheNavbar />
      <main className="flex-grow">{children}</main>
      <TheFooter />
    </>
  );
}
