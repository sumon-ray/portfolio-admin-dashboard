import { LuUser } from "react-icons/lu";
import { MdOutlineSecurity } from "react-icons/md";
import { FaCreditCard } from "react-icons/fa";
import { IoMdStarOutline } from "react-icons/io";
import { RiUserReceivedLine } from "react-icons/ri";
import { TbCalendarEvent } from "react-icons/tb";

export const profileSettingItems = [
  {
    title: "Personal Information",
    icon: <LuUser className="w-5 h-5" />,
    href: "/profile/personal-info",
  },
  {
    title: "My Events",
    icon: <TbCalendarEvent className="w-5 h-5" />,
    href: "/profile/my-events",
  },
  {
    title: "My Received Invites",
    icon: <RiUserReceivedLine className="w-5 h-5" />,
    href: "/profile/my-received-invites",
  },
  {
    title: "Payments History",
    icon: <FaCreditCard className="w-5 h-5" />,
    href: "/profile/payments-history",
  },
  {
    title: "Reviews",
    icon: <IoMdStarOutline className="w-5 h-5" />,
    href: "/profile/review",
  },
  {
    title: "Privacy & Security",
    icon: <MdOutlineSecurity className="w-5 h-5" />,
    href: "/profile/privacy_and_security",
  },
];
