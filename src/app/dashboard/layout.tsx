// import { AppSidebar } from "@/components/sidebar/app-sidebar"
import { AppSidebar } from "@/components/sidebar/app-sidebar"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import '../globals.css';
// FILE: app/dashboard/layout.tsx
// ... (আপনার AppSidebar, SidebarProvider, SidebarTrigger import গুলো) ...

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      {/* এই div টি পুরো ড্যাশবোর্ড লেআউটকে নিয়ন্ত্রণ করে।
        - `flex`: এর চাইল্ডগুলোকে পাশাপাশি রাখে (Sidebar এবং main).
        - `min-h-screen`: পুরো লেআউটটিকে অন্তত পুরো স্ক্রিন উচ্চতা দেয়।
      */}
      <div className="flex min-h-screen">
        <AppSidebar /> {/* এটি আপনার সাইডবার, এর নিজস্ব `fixed` পজিশনিং এবং `width` থাকবে। */}

        {/* মূল কন্টেন্ট এরিয়া:
          - `flex-1`: সাইডবারের পর বাকি সব অনুভূমিক স্থান নেয়।
          - `ml-[260px]`: সাইডবারের প্রস্থ অনুযায়ী একটি বাম মার্জিন তৈরি করে যাতে কন্টেন্ট সাইডবারের নিচে চলে না যায়।
            (আপনার সাইডবারের প্রকৃত প্রস্থ অনুযায়ী `260px` পরিবর্তন করুন)।
          - `overflow-y-auto`: যদি কন্টেন্ট বেশি হয়, তাহলে উল্লম্বভাবে স্ক্রল করার সুযোগ দেয়।
          - `py-8 px-4`: কন্টেন্টের চারপাশে কিছু প্যাডিং যোগ করে।
        */}
        <main className="flex-1   py-8 px-4">
          <SidebarTrigger /> 
          {children} 
        </main>
      </div>
    </SidebarProvider>
  );
}
