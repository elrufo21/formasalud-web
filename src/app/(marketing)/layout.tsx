import { Header } from "@/components/shared/Header";
import { Footer } from "@/components/shared/Footer";

interface MarketingLayoutProps {
  children: React.ReactNode;
}

export default function MarketingLayout({ children }: MarketingLayoutProps) {
  return (
    <>
      <Header />

      {children}
        
      <Footer />
    </>
  );
}
