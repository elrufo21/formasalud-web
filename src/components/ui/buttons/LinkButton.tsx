import Link from "next/link";
import { cn } from "@/lib/utils";

interface LinkButtonProps {
  href: string;
  children: React.ReactNode;
  onClick?: () => void;

  textColor?: string;
  backgroundColor?: string;
  borderColor?: string;

  hoverBackgroundColor?: string;
  hoverTextColor?: string;
  hoverBorderColor?: string;

  className?: string;
}

const LinkButton = ({
  href,
  children,
  onClick,
  textColor = "text-[#0B2436]",
  backgroundColor = "bg-transparent",
  borderColor = "border-[#0B2436]/25",
  hoverBackgroundColor = "hover:bg-[#0B2436]/5",
  hoverTextColor,
  hoverBorderColor,
  className,
}: LinkButtonProps) => {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        "inline-flex items-center justify-center border px-5 py-3 text-sm font-semibold transition-colors",
        textColor,
        backgroundColor,
        borderColor,
        hoverBackgroundColor,
        hoverTextColor,
        hoverBorderColor,
        className,
      )}
    >
      {children}
    </Link>
  );
};

export default LinkButton;
