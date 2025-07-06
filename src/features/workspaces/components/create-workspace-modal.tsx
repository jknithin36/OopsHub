"use client";

import { useWorkspaceModal } from "@/features/workspaces/hooks/use-create-workspace-modal";
import { ResponsiveModal } from "@/components/responsive-modal";
import { CreateWorkSpaceForm } from "./create-workspace-form";
import { motion } from "framer-motion";
import {
  Sparkles,
  FolderPlus,
  ListTodo,
  BarChart3,
  Users,
  ShieldCheck,
  Rocket,
} from "lucide-react";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

const CreateWorkSpaceModal = () => {
  const { isOpen, close } = useWorkspaceModal();

  return (
    <ResponsiveModal open={isOpen} onOpenChange={close}>
      <div className="max-w-4xl mx-auto w-full bg-muted relative overflow-hidden">
        {/* Decorative bubbles */}
        <div className="absolute top-[-40px] left-[-40px] w-32 h-32 bg-primary/10 rounded-full blur-2xl animate-pulse z-0" />
        <div className="absolute bottom-[-30px] right-[-30px] w-24 h-24 bg-primary/20 rounded-full blur-2xl animate-ping z-0" />

        <div className="flex flex-col lg:flex-row w-full min-h-[70vh] relative z-10">
          {/* Left: Form */}
          <div className="lg:w-1/2 w-full flex items-center justify-center p-6 lg:p-10 bg-muted">
            <VisuallyHidden>
              <h2>Create Workspace Dialog</h2>
            </VisuallyHidden>
            <CreateWorkSpaceForm onCancel={close} />
          </div>

          {/* Right: Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:w-1/2 w-full p-6 lg:p-10 bg-muted text-muted-foreground flex flex-col justify-center"
          >
            <div className="flex items-center gap-3 mb-4">
              <Sparkles className="w-6 h-6 text-primary" />
              <h3 className="text-3xl font-extrabold text-foreground">
                Welcome to Oopshub!
              </h3>
            </div>
            <p className="text-[16px] font-medium mb-6 leading-[1.8]">
              Oopshub empowers you to build collaborative, high-performing
              workspaces.
            </p>
            <ul className="space-y-4 text-[15px]">
              <li className="flex items-start gap-2">
                <FolderPlus className="w-4 h-4 text-primary" />
                Create multiple workspaces
              </li>
              <li className="flex items-start gap-2">
                <ListTodo className="w-4 h-4 text-primary" />
                Kanban & calendar views
              </li>
              <li className="flex items-start gap-2">
                <BarChart3 className="w-4 h-4 text-primary" />
                Analytics dashboard
              </li>
              <li className="flex items-start gap-2">
                <Users className="w-4 h-4 text-primary" />
                Team collaboration
              </li>
              <li className="flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-primary" />
                Role-based permissions
              </li>
              <li className="flex items-start gap-2">
                <Rocket className="w-4 h-4 text-primary" />
                Fast onboarding
              </li>
            </ul>
          </motion.div>
        </div>
      </div>
    </ResponsiveModal>
  );
};

export default CreateWorkSpaceModal;
