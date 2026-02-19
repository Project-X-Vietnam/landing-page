import PageTransition from "@/components/PageTransition";

export default function SFP2026Template({
  children,
}: {
  children: React.ReactNode;
}) {
  return <PageTransition>{children}</PageTransition>;
}
