"use client";

import { useParams } from "next/navigation";
import { toast } from "sonner";
import { useResetInviteCode } from "../api/use-reset-invite-code";
import { useConfirm } from "@/hooks/use-confirm";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, RefreshCcw } from "lucide-react";

export const ResetInviteCodeCard = () => {
  const { workspaceId } = useParams();
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
      toast.success(`New invite code: ${code}`);
    },
  });

  const handleReset = async () => {
    const ok = await confirm();
    if (!ok) return;
    mutate(workspaceId as string);
  };

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
            Resetting the invite code will generate a new one. This is useful if
            you suspect the old one was shared externally.
          </p>
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
        </CardContent>
      </Card>
    </>
  );
};
