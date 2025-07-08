"use client";

import { useRouter, useParams } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useDeleteWorkspace } from "../api/use-delete-workspace";
import { useConfirm } from "@/hooks/use-confirm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Trash2 } from "lucide-react";

export const DeleteWorkspaceCard = () => {
  const { workspaceId } = useParams();
  const router = useRouter();
  const deleteMutation = useDeleteWorkspace();

  const [ConfirmDialog, confirm] = useConfirm(
    "Are you sure you want to delete this?",
    "This action will permanently delete the content and cannot be undone.",
    {
      confirmText: "Delete",
      confirmVariant: "destructive",
      icon: <Trash2 className="w-5 h-5 text-destructive mt-1" />,
    }
  );

  const handleDelete = async () => {
    const ok = await confirm();
    if (!ok) return;

    deleteMutation.mutate(workspaceId as string, {
      onSuccess: () => {
        toast.success("Workspace deleted.");
        router.push("/");
      },
      onError: (err) => toast.error(err.message),
    });
  };

  return (
    <>
      <ConfirmDialog />
      <Card className="bg-white border rounded-xl shadow-sm p-6 space-y-4">
        <CardHeader className="p-0">
          <CardTitle className="text-base font-medium text-destructive">
            Danger Zone
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0 space-y-4">
          <p className="text-sm text-muted-foreground">
            This action is irreversible. Please confirm before continuing.
          </p>
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={deleteMutation.isPending}
            className="w-fit"
          >
            {deleteMutation.isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Deleting...
              </>
            ) : (
              <>
                <Trash2 className="mr-2 h-4 w-4" />
                Delete Workspace
              </>
            )}
          </Button>
        </CardContent>
      </Card>
    </>
  );
};
