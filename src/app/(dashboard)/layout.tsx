import Navbar from "@/components/navbar";
import { Sidebar } from "@/components/sidebar";
import CreateWorkSpaceModal from "@/features/workspaces/components/create-workspace-modal";
import { WorkspaceModalProvider } from "@/features/workspaces/hooks/use-create-workspace-modal";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <WorkspaceModalProvider>
      <CreateWorkSpaceModal />
      <div className="flex w-full min-h-screen">
        <div className="hidden lg:block fixed left-0 top-0 w-[264px] h-full overflow-auto">
          <Sidebar />
        </div>
        <div className="lg:pl-[264px] w-full">
          <div className="mx-auto max-w-screen-2xl h-full">
            <Navbar />
            <main className="h-full py-8 px-6 flex flex-col">{children}</main>
          </div>
        </div>
      </div>
    </WorkspaceModalProvider>
  );
};

export default DashboardLayout;
