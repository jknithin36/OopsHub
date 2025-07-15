// "use client";

// import { UserButton } from "@/features/auth/components/user-button";
// import Image from "next/image";
// import Link from "next/link";

// interface StandAloneLayoutProps {
//   children: React.ReactNode;
// }

// const StandAloneLayout = ({ children }: StandAloneLayoutProps) => {
//   return (
//     <main className="min-h-screen bg-[#f4f5f7] text-neutral-900 flex flex-col">
//       {/* Header */}
//       <header className="w-full border-b border-gray-300">
//         <div className="mx-auto w-full max-w-7xl px-6 h-[72px] flex items-center justify-between">
//           <Link href="/" className="flex items-center space-x-2">
//             <Image
//               src="/navbar.png"
//               alt="OopsHub logo"
//               width={140}
//               height={40}
//               className="object-contain"
//               priority
//             />
//           </Link>
//           <UserButton />
//         </div>
//       </header>

//       {/* Main Content */}
//       <section className="flex-grow">{children}</section>
//     </main>
//   );
// };

// export default StandAloneLayout;
import { Sidebar } from "@/components/sidebar";
import Navbar from "@/components/navbar";
import { ReactNode } from "react";

export default function WorkspaceLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-screen bg-white text-neutral-900">
      {/* Sidebar */}
      <aside className="hidden lg:flex lg:flex-col w-[260px] border-r border-gray-200 bg-white">
        <Sidebar />
      </aside>

      {/* Content Area */}
      <main className="flex-1 flex flex-col">
        <Navbar />
        <div className="flex-1 overflow-y-auto px-6 py-6 bg-[#f9f9f9]">
          {children}
        </div>
      </main>
    </div>
  );
}
