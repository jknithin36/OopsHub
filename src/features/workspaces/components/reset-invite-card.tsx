"use client";

import { useParams } from "next/navigation";
import { toast } from "sonner";
import { useResetInviteCode } from "../api/use-reset-invite-code";
import { useConfirm } from "@/hooks/use-confirm";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, RefreshCcw, Send, Copy } from "lucide-react";
import { useState } from "react";

export const ResetInviteCodeCard = ({ inviteCode }: { inviteCode: string }) => {
  const { workspaceId } = useParams();
  const [currentCode, setCurrentCode] = useState(inviteCode);

  const [ConfirmDialog, confirm] = useConfirm(
    "Reset invite code?",
    "This will generate a new invite code and invalidate the previous one.",
    {
      confirmText: "Reset",
      confirmVariant: "destructive",
      icon: <RefreshCcw className="w-5 h-5 text-destructive mt-1" />,
    }
  );

  const { mutate, isPending } = useResetInviteCode({
    onSuccess: (data) => {
      const code = data?.data?.inviteCode;
      if (code) {
        setCurrentCode(code);
        toast.success("Invite code has been reset!");
      }
    },
  });

  const handleReset = async () => {
    const ok = await confirm();
    if (!ok) return;
    mutate(workspaceId as string);
  };

  const handleResend = () => {
    toast.success("Invite link has been resent!");
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(inviteLink);
    toast.success("Invite link copied!");
  };

  const appUrl =
    typeof window !== "undefined"
      ? window.location.origin
      : "http://localhost:3000";

  const inviteLink = `${appUrl}/workspaces/${workspaceId}/join/${currentCode}`;

  return (
    <>
      <ConfirmDialog />
      <Card className="bg-white border rounded-xl shadow-sm p-6 space-y-4">
        <CardHeader className="p-0">
          <CardTitle className="text-base font-medium text-foreground">
            Invite Code
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0 space-y-4">
          <p className="text-sm text-muted-foreground">
            Share this link to invite others to your workspace.
          </p>

          {/* ✅ SAFE TEXT ONLY (no anchor/prefetch) */}
          <div className="bg-muted text-foreground px-4 py-2 rounded-md text-sm font-mono break-all border flex items-center justify-between">
            <span className="truncate">{inviteLink}</span>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleCopy}
              className="text-muted-foreground hover:text-foreground"
            >
              <Copy className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex gap-3 flex-wrap">
            <Button
              variant="destructive"
              onClick={handleReset}
              disabled={isPending}
              className="w-fit"
            >
              {isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Resetting...
                </>
              ) : (
                <>
                  <RefreshCcw className="mr-2 h-4 w-4" />
                  Reset Invite Code
                </>
              )}
            </Button>

            <Button variant="secondary" onClick={handleResend}>
              <Send className="mr-2 h-4 w-4" />
              Resend Invite
            </Button>

            {/* Optional: manual open */}
            <Button
              variant="outline"
              onClick={() => window.open(inviteLink, "_blank")}
            >
              Open Invite Link
            </Button>
          </div>
        </CardContent>
      </Card>
    </>
  );
};
