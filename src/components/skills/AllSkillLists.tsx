"use client";

import { useRouter } from "next/navigation";
import { ISkill } from "./skill.interface";
import { deleteSkill } from "@/services/skillsService";
import { toast } from "sonner";
import React from 'react'; // React import নিশ্চিত করুন
import { getIconComponent } from "@/app/utils/iconHelper";

// এখানে react-icons এর যেসকল সাব-প্যাকেজ থেকে আইকন ব্যবহার করবেন, সেগুলোকে import করুন।
// পারফরম্যান্সের জন্য, শুধুমাত্র প্রয়োজনীয়গুলো ইম্পোর্ট করাই ভালো।

const AllSkillLists = ({ mySkills }: { mySkills: ISkill[] }) => {
  const router = useRouter();

  // একটি ফাংশন যা আইকন নাম থেকে কম্পোনেন্ট রিটার্ন করবে


  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {mySkills.map((skill) => {
        const IconComponent = getIconComponent(skill.icon); // আইকন কম্পোনেন্ট পান

        return (
          <div
            key={skill._id}
            className="bg-white shadow-md rounded-2xl p-4 border border-gray-200 hover:shadow-xl transition-all duration-300"
          >
            <div className="flex items-center gap-4">
              {IconComponent ? ( // যদি IconComponent থাকে, তাহলে সেটি রেন্ডার করুন
                <IconComponent className="w-12 h-12 text-blue-600" />
              ) : (
                // যদি IconComponent না থাকে বা skill.icon না থাকে, তাহলে ফলব্যাক হিসেবে নামের প্রথম অক্ষর দেখান
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-200 text-gray-600 text-sm">
                  {skill.name.charAt(0)}
                </div>
              )}
              <div>
                <h3 className="text-lg font-semibold text-gray-800">{skill.name}</h3>
                <p className="text-sm text-gray-500 capitalize">{skill.type} skill</p>
              </div>
            </div>
            <div className="mt-4">
              <span className="text-sm font-medium text-gray-700">
                Proficiency:
              </span>{" "}
              <span className="text-sm text-blue-600 capitalize font-semibold">
                {skill.proficiency}
              </span>
            </div>
            <div className="mt-4 flex gap-3">
              <button
                onClick={() => router.push(`/dashboard/skills/${skill._id}`)}
                className="px-4 py-1 rounded-lg bg-yellow-500 text-white text-sm hover:bg-yellow-600 transition"
              >
                Update
              </button>
              <button
                onClick={async () => {
                  if (!skill?._id) return;
                  try {
                    await deleteSkill(skill?._id);
                    toast.success("deleted successfully");
                    router.refresh();
                  } catch (error) {
                    toast.error("failed to delete skill");
                  }
                }}
                className="px-4 py-1 rounded-lg bg-red-500 text-white text-sm hover:bg-red-600 transition"
              >
                Delete
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default AllSkillLists;