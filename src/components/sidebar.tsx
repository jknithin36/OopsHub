// "use client";

// import Image from "next/image";
// import Link from "next/link";
// import { Navigation } from "./navigation";
// import { Users, LayoutDashboard, FolderKanban, Sparkles } from "lucide-react";
// import WorkSpace from "./workspace";

// export const Sidebar = () => {
//   return (
//     <aside className="h-screen w-64 border-r border-gray-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 flex flex-col justify-between sticky top-0 left-0 shadow-sm z-50 overflow-hidden">
//       {/* 🔝 Logo + Slogan + Workspace Selector */}
//       <div className="flex flex-col gap-2 px-4 py-5 border-b border-muted">
//         <Link href="/" className="flex items-center gap-2">
//           <Image
//             src="/navbar.png"
//             alt="Oopshub Logo"
//             width={140}
//             height={40}
//             priority
//             className="object-contain"
//           />
//         </Link>
//         <span className="text-xs text-muted-foreground italic">
//           Work smarter with Oopshub
//         </span>

//         {/* 🧭 Workspace Selector */}
//         <div className="mt-3">
//           <WorkSpace />
//         </div>
//       </div>

//       {/* 📚 Navigation + Project Links + Feedback */}
//       <div className="flex-1 flex flex-col gap-6 px-4 py-6 overflow-auto">
//         {/* 🔗 Navigation */}
//         <Navigation />

//         {/* 📁 Recent Projects */}
//         <div>
//           <h4 className="text-[11px] text-muted-foreground uppercase tracking-widest px-1 mb-2">
//             Recent Projects
//           </h4>

//           <div className="space-y-1">
//             <Link
//               href="#"
//               className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium bg-blue-100 text-blue-600 hover:bg-blue-200 transition"
//             >
//               <LayoutDashboard className="w-4 h-4" />
//               Oopshub Dashboard
//             </Link>

//             <Link
//               href="#"
//               className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-muted-foreground hover:bg-muted transition"
//             >
//               <Sparkles className="w-4 h-4" />
//               AI Task Recommender
//             </Link>

//             <Link
//               href="#"
//               className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-muted-foreground hover:bg-muted transition"
//             >
//               <Users className="w-4 h-4" />
//               Teams Beta
//             </Link>

//             <Link
//               href="#"
//               className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-muted-foreground hover:bg-muted transition"
//             >
//               ⋯ More coming soon
//             </Link>
//           </div>
//         </div>

//         {/* ✨ Feedback Card */}
//         <div className="mt-3 px-3 py-3 rounded-lg border border-muted bg-muted/40 text-center text-xs text-muted-foreground space-y-1">
//           <p className="font-semibold text-sm text-foreground">
//             💬 Got feedback?
//           </p>
//           <p>Help us improve Oopshub. We’re listening.</p>
//           <Link
//             href="mailto:insane414425@gmail.com"
//             className="inline-block mt-1 text-blue-600 font-medium hover:underline text-xs"
//           >
//             Send feedback →
//           </Link>
//         </div>
//       </div>

//       {/* 🔻 Footer */}
//       <div className="px-4 py-6 border-t border-gray-200 dark:border-neutral-800 text-center text-xs text-muted-foreground">
//         <p className="mb-1 italic">Oops, work just got easier.</p>
//         <Link
//           href="https://www.linkedin.com/in/jknithin/"
//           className="text-blue-600 font-semibold hover:underline"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Connect on LinkedIn →
//         </Link>
//       </div>
//     </aside>
//   );
// };
"use client";

import Image from "next/image";
import Link from "next/link";
import { Navigation } from "./navigation";
import { Users, LayoutDashboard, FolderKanban, Sparkles } from "lucide-react";
import WorkSpace from "./workspace";

export const Sidebar = () => {
  return (
    <aside className="h-screen w-64 border-r border-gray-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 flex flex-col justify-between sticky top-0 left-0 shadow-sm z-50">
      {/* 🔝 Top: Logo + Slogan + Workspace Selector */}
      <div className="px-4 py-5 border-b border-muted flex flex-col gap-2">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/navbar.png"
            alt="Oopshub Logo"
            width={140}
            height={40}
            priority
            className="object-contain"
          />
        </Link>
        <span className="text-xs text-muted-foreground italic">
          Work smarter with Oopshub
        </span>

        {/* Workspace Selector */}
        <div className="mt-3">
          <WorkSpace />
        </div>
      </div>

      {/* 🔃 Middle: Scrollable content */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-6">
        {/* Navigation */}
        <Navigation />

        {/* Recent Projects */}
        <div>
          <h4 className="text-[11px] text-muted-foreground uppercase tracking-widest px-1 mb-2">
            Recent Projects
          </h4>

          <div className="space-y-1">
            <Link
              href="#"
              className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium bg-blue-100 text-blue-600 hover:bg-blue-200 transition"
            >
              <LayoutDashboard className="w-4 h-4" />
              Oopshub Dashboard
            </Link>

            <Link
              href="#"
              className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-muted-foreground hover:bg-muted transition"
            >
              <FolderKanban className="w-4 h-4" />
              Kanban Workspace
            </Link>

            <Link
              href="#"
              className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-muted-foreground hover:bg-muted transition"
            >
              <Users className="w-4 h-4" />
              Teams Beta
            </Link>

            <Link
              href="#"
              className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-muted-foreground hover:bg-muted transition"
            >
              ⋯ More coming soon
            </Link>
          </div>
        </div>

        {/* Feedback box */}
        <div className="px-3 py-3 rounded-lg border border-muted bg-muted/40 text-center text-xs text-muted-foreground space-y-1">
          <p className="font-semibold text-sm text-foreground">
            💬 Got feedback?
          </p>
          <p>Help us improve Oopshub. We’re listening.</p>
          <Link
            href="mailto:insane414425@gmail.com"
            className="inline-block mt-1 text-blue-600 font-medium hover:underline text-xs"
          >
            Send feedback →
          </Link>
        </div>
      </div>

      {/* 🔻 Bottom Footer */}
      <div className="px-4 py-4 border-t border-gray-200 dark:border-neutral-800 text-center text-xs text-muted-foreground">
        <p className="mb-1 italic">Oops, work just got easier.</p>
        <Link
          href="https://www.linkedin.com/in/jknithin/"
          className="text-blue-600 font-semibold hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          Connect on LinkedIn →
        </Link>
      </div>
    </aside>
  );
};
