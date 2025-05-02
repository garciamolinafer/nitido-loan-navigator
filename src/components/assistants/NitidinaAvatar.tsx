
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface NitidinaAvatarProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function NitidinaAvatar({ size = "md", className }: NitidinaAvatarProps) {
  const sizeClasses = {
    sm: "h-8 w-8",
    md: "h-10 w-10",
    lg: "h-12 w-12"
  };

  return (
    <Avatar className={`${sizeClasses[size]} ${className || ""}`}>
      <AvatarImage src="/lovable-uploads/7d678ec7-7fbc-4476-90b4-b046b2c0ad1c.png" alt="Nitidina" />
      <AvatarFallback>Ni</AvatarFallback>
    </Avatar>
  );
}
