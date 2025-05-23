// app/(auth)/layout.tsx
// import type { Metadata } from "next";

// export const metadata: Metadata = {
//   title: "Authentication | MyApp",
//   description: "Login or register to continue",
// };

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className=" bg-gradient-to-l  from-[#2e3852] via-[#95a6c1] to-[#1E293B] ">
      {children}
    </div>
  );
}
