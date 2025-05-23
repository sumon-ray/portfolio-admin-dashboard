import { useState } from "react";
import { Loader2 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type ProfileAvatarProps = {
  src?: string | null;
  alt?: string;
  fallbackText?: string;
};

export function ProfileAvatar({ src, alt = "Profile", fallbackText = "U" }: ProfileAvatarProps) {
  const [loaded, setLoaded] = useState(false);

  return (
    <Avatar>
      {src && (
        <AvatarImage
          src={src}
          alt={alt}
          onLoad={() => setLoaded(true)}
          onError={() => setLoaded(true)}
          className={loaded ? "opacity-100" : "opacity-0"}
        />
      )}

      {!loaded && (
        <div className="absolute inset-0 flex items-center justify-center">
          <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
        </div>
      )}

      <AvatarFallback className={loaded ? "opacity-0" : "opacity-100"}>
        {fallbackText}
      </AvatarFallback>
    </Avatar>
  );
}
