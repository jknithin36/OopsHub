import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { getImageUrl } from "@/lib/get-image-url";

interface WorkSpaceAvatarProps {
  image?: string | null;
  name: string;
  className?: string;
}

export const WorkSpaceAvatar = ({
  image,
  name,
  className,
}: WorkSpaceAvatarProps) => {
  const imageUrl = getImageUrl(image);

  return (
    <Avatar className={cn("h-6 w-6", className)}>
      <AvatarImage src={imageUrl} alt={name} className="object-cover" />
      <AvatarFallback className="bg-muted text-muted-foreground text-[10px] font-medium uppercase">
        {name?.[0] ?? "W"}
      </AvatarFallback>
    </Avatar>
  );
};
