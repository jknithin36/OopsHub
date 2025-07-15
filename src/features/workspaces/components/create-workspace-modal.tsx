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
      <div className="max-w-4xl mx-auto w-full bg-white dark:bg-gray-900 relative overflow-hidden border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm font-sans">
        {/* Decorative orange circles */}
        <div className="absolute top-[-40px] left-[-40px] w-32 h-32 bg-orange-200/20 rounded-full blur-2xl animate-pulse z-0" />
        <div className="absolute bottom-[-30px] right-[-30px] w-24 h-24 bg-orange-200/20 rounded-full blur-2xl animate-ping z-0" />

        <div className="flex flex-col lg:flex-row w-full min-h-[70vh] relative z-10">
          {/* Left: Form */}
          <div className="lg:w-1/2 w-full flex items-center justify-center px-6 py-4 bg-[#F4F5F7] dark:bg-gray-800">
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
            className="lg:w-1/2 w-full px-4 py-3 bg-white dark:bg-gray-900 text-muted-foreground flex flex-col justify-center"
          >
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <h3 className="text-xl font-semibold text-foreground">
                Welcome to Oopshub!
              </h3>
            </div>
            <p className="text-sm text-muted-foreground mb-4 leading-[1.8]">
              Oopshub empowers you to build collaborative, high-performing
              workspaces.
            </p>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2 px-2 py-1 rounded-md hover:bg-muted transition duration-200">
                <FolderPlus className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                Create multiple workspaces
              </li>
              <li className="flex items-start gap-2 px-2 py-1 rounded-md hover:bg-muted transition duration-200">
                <ListTodo className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                Kanban & calendar views
              </li>
              <li className="flex items-start gap-2 px-2 py-1 rounded-md hover:bg-muted transition duration-200">
                <BarChart3 className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                Analytics dashboard
              </li>
              <li className="flex items-start gap-2 px-2 py-1 rounded-md hover:bg-muted transition duration-200">
                <Users className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                Team collaboration
              </li>
              <li className="flex items-start gap-2 px-2 py-1 rounded-md hover:bg-muted transition duration-200">
                <ShieldCheck className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                Role-based permissions
              </li>
              <li className="flex items-start gap-2 px-2 py-1 rounded-md hover:bg-muted transition duration-200">
                <Rocket className="w-4 h-4 text-blue-600 dark:text-blue-400" />
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
