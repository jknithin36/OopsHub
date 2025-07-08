"use client";

import { ResponsiveModal } from "@/components/responsive-modal";
import { CreateProjectForm } from "./create-project-form";
import { motion } from "framer-motion";
import {
  FolderPlus,
  ListTodo,
  BarChart3,
  ShieldCheck,
  Users,
  Rocket,
  Sparkles,
} from "lucide-react";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { useProjectModal } from "../hooks/use-create-project-modal";

const CreateProjectModal = () => {
  const { isOpen, close } = useProjectModal();

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
              <h2>Create Project Dialog</h2>
            </VisuallyHidden>
            <CreateProjectForm onCancel={close} />
          </div>

          {/* Right: Info Panel */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:w-1/2 w-full p-6 lg:p-10 bg-muted text-muted-foreground flex flex-col justify-center"
          >
            <div className="flex items-center gap-3 mb-4">
              <Sparkles className="w-6 h-6 text-primary" />
              <h3 className="text-3xl font-extrabold text-foreground">
                Start Your Next Project
              </h3>
            </div>
            <p className="text-[16px] font-medium mb-6 leading-[1.8]">
              Projects help you manage tasks, goals, and timelines within your
              workspace.
            </p>
            <ul className="space-y-4 text-[15px]">
              <li className="flex items-start gap-2">
                <FolderPlus className="w-4 h-4 text-primary" />
                Organize with Kanban boards
              </li>
              <li className="flex items-start gap-2">
                <ListTodo className="w-4 h-4 text-primary" />
                Plan tasks and milestones
              </li>
              <li className="flex items-start gap-2">
                <BarChart3 className="w-4 h-4 text-primary" />
                Visualize project progress
              </li>
              <li className="flex items-start gap-2">
                <Users className="w-4 h-4 text-primary" />
                Collaborate with team
              </li>
              <li className="flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-primary" />
                Enforce role-based access
              </li>
              <li className="flex items-start gap-2">
                <Rocket className="w-4 h-4 text-primary" />
                Launch faster with Oopshub
              </li>
            </ul>
          </motion.div>
        </div>
      </div>
    </ResponsiveModal>
  );
};

export default CreateProjectModal;
