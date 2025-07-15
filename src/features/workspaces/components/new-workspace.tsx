// "use client";

// import { useRef, useState } from "react";
// import { useForm } from "react-hook-form";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { toast } from "sonner";
// import { Loader2 } from "lucide-react";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { useCreateWorkSpace } from "../api/use-create-workspace";
// import { useRouter } from "next/navigation"; // ✅ import router

// type FormValues = {
//   name: string;
//   image?: File;
// };

// export const NewWorkSpace = () => {
//   const router = useRouter(); // ✅ init router
//   const inputRef = useRef<HTMLInputElement>(null);
//   const [imagePreview, setImagePreview] = useState<string | null>(null);

//   const { mutate, isPending } = useCreateWorkSpace({
//     onSuccess: (data) => {
//       const id = data?.data?.$id || data?.data?.id;
//       if (id) {
//         router.push(`/workspaces/${id}`); // ✅ redirect
//       } else {
//         toast.error("Workspace created but no ID returned.");
//       }
//     },
//   });

//   const form = useForm<FormValues>({
//     defaultValues: { name: "" },
//   });

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (!file) return;
//     if (file.size > 1024 * 1024) {
//       toast.error("Image must be under 1MB.");
//       return;
//     }
//     form.setValue("image", file);
//     setImagePreview(URL.createObjectURL(file));
//   };

//   const onSubmit = (values: FormValues) => {
//     const formData = new FormData();
//     formData.append("name", values.name);
//     if (values.image instanceof File) {
//       formData.append("image", values.image);
//     }
//     mutate(formData); // call with redirect logic
//   };

//   return (
//     <div className="min-h-screen w-full bg-white text-neutral-900 flex items-center justify-center px-4 py-12">
//       <div className="w-full max-w-6xl flex flex-col lg:flex-row gap-16 items-center">
//         {/* Left - Description */}
//         <div className="w-full lg:w-2/3 space-y-6">
//           <p className="text-sm text-gray-500">Create with Confidence</p>
//           <h1 className="text-4xl md:text-5xl font-bold leading-tight">
//             Build with Purpose. <br /> Launch with OopsHub.
//           </h1>
//           <p className="text-gray-600 max-w-xl">
//             OopsHub helps teams turn ideas into action. Plan, organize, and
//             track your team's work in a beautifully structured way — built for
//             speed and clarity.
//           </p>

//           <ul className="mt-6 space-y-2 text-gray-700 list-disc list-inside">
//             <li>Instant setup and real-time collaboration</li>
//             <li>Invite teammates and get started in minutes</li>
//             <li>Organize everything — from tasks to projects</li>
//           </ul>
//         </div>

//         {/* Right - Form */}
//         <div className="w-full lg:w-1/2 bg-white border border-gray-200 p-8 rounded-xl shadow-md">
//           <h2 className="text-xl font-semibold mb-6">Create a Workspace</h2>
//           <Form {...form}>
//             <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
//               <FormField
//                 control={form.control}
//                 name="name"
//                 rules={{ required: "Workspace name is required" }}
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Workspace Name</FormLabel>
//                     <FormControl>
//                       <Input
//                         placeholder="Enter workspace name"
//                         className="bg-white border border-gray-300"
//                         {...field}
//                       />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />

//               <FormField
//                 control={form.control}
//                 name="image"
//                 render={() => (
//                   <FormItem>
//                     <FormLabel>Workspace Logo</FormLabel>
//                     <div className="flex items-center gap-4">
//                       <Avatar className="w-14 h-14 rounded-md border overflow-hidden">
//                         {imagePreview ? (
//                           <AvatarImage
//                             src={imagePreview}
//                             className="object-cover w-full h-full"
//                             alt="Preview"
//                           />
//                         ) : (
//                           <AvatarFallback className="bg-gray-200 text-gray-500">
//                             Logo
//                           </AvatarFallback>
//                         )}
//                       </Avatar>
//                       <input
//                         type="file"
//                         accept="image/*"
//                         ref={inputRef}
//                         onChange={handleFileChange}
//                         className="text-sm text-gray-600"
//                       />
//                     </div>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />

//               <div className="flex justify-end items-center pt-2">
//                 <Button
//                   type="submit"
//                   disabled={isPending}
//                   className="bg-blue-600 hover:bg-blue-700 text-white"
//                 >
//                   {isPending ? (
//                     <>
//                       <Loader2 className="h-4 w-4 animate-spin mr-2" />
//                       Creating...
//                     </>
//                   ) : (
//                     "Create Workspace"
//                   )}
//                 </Button>
//               </div>
//             </form>
//           </Form>
//         </div>
//       </div>
//     </div>
//   );
// };

"use client";

import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  Loader2,
  Building2,
  Image,
  Rocket,
  Users,
  LayoutTemplate,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useCreateWorkSpace } from "../api/use-create-workspace";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";

type FormValues = {
  name: string;
  image?: File;
};

export const NewWorkSpace = () => {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const { mutate, isPending } = useCreateWorkSpace({
    onSuccess: (data) => {
      const id = data?.data?.$id || data?.data?.id;
      if (id) {
        toast.success("🚀 Workspace created successfully!");
        router.push(`/workspaces/${id}`);
      } else {
        toast.error("Workspace created but no ID returned.");
      }
    },
  });

  const form = useForm<FormValues>({
    defaultValues: { name: "" },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 1024 * 1024) {
      toast.error("Image must be under 1MB.");
      return;
    }
    form.setValue("image", file);
    setImagePreview(URL.createObjectURL(file));
  };

  const onSubmit = (values: FormValues) => {
    const formData = new FormData();
    formData.append("name", values.name);
    if (values.image instanceof File) {
      formData.append("image", values.image);
    }
    mutate(formData);
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-50 to-white text-neutral-900 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-6xl flex flex-col lg:flex-row gap-8 lg:gap-16 items-center">
        {/* Left - Description */}
        <div className="w-full lg:w-1/2 space-y-8">
          <div className="flex items-center gap-3">
            <div className="bg-blue-100 p-2 rounded-lg">
              <Rocket className="h-6 w-6 text-blue-600" />
            </div>
            <h2 className="text-sm font-medium text-blue-600 uppercase tracking-wider">
              Create with Confidence
            </h2>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold leading-tight text-gray-900">
            Build with Purpose. <br /> Launch with OopsHub.
          </h1>

          <p className="text-lg text-gray-600 max-w-xl">
            OopsHub helps teams turn ideas into action. Plan, organize, and
            track your team's work in a beautifully structured way — built for
            speed and clarity.
          </p>

          <Card className="p-6 bg-white border border-gray-200 shadow-sm">
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <div className="bg-green-100 p-2 rounded-lg mt-0.5">
                  <LayoutTemplate className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-800">Instant Setup</p>
                  <p className="text-sm text-gray-600 mt-1">
                    Get started in minutes with pre-built templates and
                    workflows
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="bg-purple-100 p-2 rounded-lg mt-0.5">
                  <Users className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-800">
                    Real-time Collaboration
                  </p>
                  <p className="text-sm text-gray-600 mt-1">
                    Invite teammates and work together seamlessly
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="bg-yellow-100 p-2 rounded-lg mt-0.5">
                  <Building2 className="h-5 w-5 text-yellow-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-800">
                    Structured Organization
                  </p>
                  <p className="text-sm text-gray-600 mt-1">
                    From tasks to projects, keep everything neatly organized
                  </p>
                </div>
              </li>
            </ul>
          </Card>
        </div>

        {/* Right - Form */}
        <Card className="w-full lg:w-1/2 p-8 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-blue-100 p-2 rounded-lg">
              <Building2 className="h-5 w-5 text-blue-600" />
            </div>
            <h2 className="text-2xl font-semibold text-gray-900">
              Create a Workspace
            </h2>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                rules={{ required: "Workspace name is required" }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2 text-sm font-medium text-gray-700">
                      <span className="bg-gray-100 p-1.5 rounded-md">
                        <Building2 className="h-4 w-4 text-gray-500" />
                      </span>
                      Workspace Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g., Marketing Team, Product Development"
                        className="border-gray-300 focus:border-blue-500 h-11"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription className="text-xs text-gray-500">
                      This will be the name of your team's workspace
                    </FormDescription>
                    <FormMessage className="text-red-600 text-xs" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="image"
                render={() => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2 text-sm font-medium text-gray-700">
                      <span className="bg-gray-100 p-1.5 rounded-md">
                        <Image className="h-4 w-4 text-gray-500" />
                      </span>
                      Workspace Logo
                    </FormLabel>
                    <div className="flex items-center gap-4">
                      <Avatar className="w-16 h-16 rounded-lg border-2 border-gray-200 overflow-hidden shadow-sm">
                        {imagePreview ? (
                          <AvatarImage
                            src={imagePreview}
                            className="object-cover w-full h-full"
                            alt="Preview"
                          />
                        ) : (
                          <AvatarFallback className="bg-gray-100 text-gray-500">
                            <Image className="h-6 w-6" />
                          </AvatarFallback>
                        )}
                      </Avatar>
                      <div>
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => inputRef.current?.click()}
                          className="text-sm h-9"
                        >
                          Upload Image
                        </Button>
                        <input
                          type="file"
                          accept="image/*"
                          ref={inputRef}
                          onChange={handleFileChange}
                          className="hidden"
                        />
                      </div>
                    </div>
                    <FormDescription className="text-xs text-gray-500">
                      Optional. Recommended size: 500×500px (max 1MB)
                    </FormDescription>
                    <FormMessage className="text-red-600 text-xs" />
                  </FormItem>
                )}
              />

              <div className="flex justify-end pt-4">
                <Button
                  type="submit"
                  disabled={isPending}
                  className="bg-blue-600 hover:bg-blue-700 text-white h-11 px-8 shadow-sm"
                >
                  {isPending ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin mr-2" />
                      Creating Workspace...
                    </>
                  ) : (
                    "Create Workspace"
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </Card>
      </div>
    </div>
  );
};
