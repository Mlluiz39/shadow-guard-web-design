
import { ShieldCheck } from "lucide-react";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  variant?: "full" | "icon";
}

export const Logo = ({ size = "md", variant = "full" }: LogoProps) => {
  const sizeClasses = {
    sm: "text-lg",
    md: "text-xl",
    lg: "text-2xl",
  };

  return (
    <div className="flex items-center gap-2">
      <div className="text-security-secondary flex items-center justify-center">
        <ShieldCheck className={`${size === "sm" ? "h-5 w-5" : size === "md" ? "h-6 w-6" : "h-7 w-7"}`} />
      </div>
      {variant === "full" && (
        <div className={`font-bold ${sizeClasses[size]} text-security-secondary`}>
          <span>Maximus </span>
          <span className="text-security-accent">Tecnologia</span>
        </div>
      )}
    </div>
  );
};
