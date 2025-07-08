"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { LinkIcon } from "lucide-react";

export const JoinWithInviteLinkDialog = () => {
  const [open, setOpen] = useState(false);
  const [link, setLink] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const url = new URL(link);
      const parts = url.pathname.split("/");

      const workspaceId = parts[parts.indexOf("workspaces") + 1];
      const inviteCode = parts[parts.indexOf("join") + 1];

      if (!workspaceId || !inviteCode) throw new Error();

      router.push(`/workspaces/${workspaceId}/join/${inviteCode}`);
      setOpen(false);
    } catch {
      setError("Please enter a valid invite link");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="gap-2 text-muted-foreground hover:text-foreground"
        >
          <LinkIcon className="w-4 h-4" />
          <span className="hidden sm:inline">Join Workspace</span>
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle>Join Workspace</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            placeholder="Paste invite link here"
            value={link}
            onChange={(e) => {
              setLink(e.target.value);
              setError("");
            }}
            className={cn(error && "border-destructive")}
          />
          {error && <p className="text-sm text-destructive">{error}</p>}
          <Button type="submit" className="w-full">
            Join
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
