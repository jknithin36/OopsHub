"use client";

import Image from "next/image";
import { getImageUrl } from "@/lib/get-image-url"; // your helper

interface MemberAvatarProps {
  name: string;
  imageId?: string | null;
  className?: string;
  fallbackClassName?: string;
}

export const MemberAvatar = ({
  name,
  imageId,
  className = "w-8 h-8",
  fallbackClassName = "text-xs",
}: MemberAvatarProps) => {
  const imageUrl = getImageUrl(imageId);

  return (
    <div className={`relative ${className}`}>
      {imageUrl ? (
        <Image
          src={imageUrl}
          alt={name}
          fill
          className="rounded-full object-cover"
        />
      ) : (
        <div
          className={`rounded-full bg-muted flex items-center justify-center w-full h-full ${fallbackClassName}`}
        >
          <span className="text-muted-foreground font-medium">
            {name?.charAt(0).toUpperCase()}
          </span>
        </div>
      )}
    </div>
  );
};
