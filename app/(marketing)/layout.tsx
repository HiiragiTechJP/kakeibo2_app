import { MarketingFooter } from "@/components/marketing-footer";
import { MarketingHeader } from "@/components/marketing-header";

export default function MarketingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <MarketingHeader />
      <div className="flex flex-1 flex-col">{children}</div>
      <MarketingFooter />
    </>
  );
}
