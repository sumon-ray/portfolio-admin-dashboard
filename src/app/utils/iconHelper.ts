import * as AiIcons from "react-icons/ai";
import * as BiIcons from "react-icons/bi";
import * as BsIcons from "react-icons/bs";
import * as CgIcons from "react-icons/cg";
import * as CiIcons from "react-icons/ci";
import * as DiIcons from "react-icons/di";
import * as FaIcons from "react-icons/fa";
import * as FcIcons from "react-icons/fc";
import * as FiIcons from "react-icons/fi";
import * as GiIcons from "react-icons/gi";
import * as GoIcons from "react-icons/go";
import * as GrIcons from "react-icons/gr";
import * as HiIcons from "react-icons/hi";
import * as Hi2Icons from "react-icons/hi2";
import * as ImIcons from "react-icons/im";
import * as IoIcons from "react-icons/io";
import * as Io5Icons from "react-icons/io5";
import * as LiaIcons from "react-icons/lia";
import * as LuIcons from "react-icons/lu";
import * as MdIcons from "react-icons/md";
import * as RiIcons from "react-icons/ri";
import * as RxIcons from "react-icons/rx";
import * as SiIcons from "react-icons/si";
import * as SlIcons from "react-icons/sl";
import * as TbIcons from "react-icons/tb";
import * as TfiIcons from "react-icons/tfi";
import * as TiIcons from "react-icons/ti";
import * as VscIcons from "react-icons/vsc";
import * as WiIcons from "react-icons/wi";

export const getIconComponent = (iconName?: string) => {
  if (!iconName) return null;

  const prefix3 = iconName.substring(0, 3);
  const prefix2 = iconName.substring(0, 2);

  switch (prefix3) {
    case "Hi2":
      return (Hi2Icons as any)[iconName];
    case "Io5":
      return (Io5Icons as any)[iconName];
    case "Lia":
      return (LiaIcons as any)[iconName];
  }

  switch (prefix2) {
    case "Ai":
      return (AiIcons as any)[iconName];
    case "Bi":
      return (BiIcons as any)[iconName];
    case "Bs":
      return (BsIcons as any)[iconName];
    case "Ci":
      return (CiIcons as any)[iconName];
    case "Cg":
      return (CgIcons as any)[iconName];
    case "Ch":
      return (CiIcons as any)[iconName];
    case "Di":
      return (DiIcons as any)[iconName];
    case "Fi":
      return (FiIcons as any)[iconName];
    case "Fa":
      return (FaIcons as any)[iconName];
    case "Fc":
      return (FcIcons as any)[iconName];
    case "Gi":
      return (GiIcons as any)[iconName];
    case "Go":
      return (GoIcons as any)[iconName];
    case "Gr":
      return (GrIcons as any)[iconName];
    case "Hi":
      return (HiIcons as any)[iconName];
    case "Im":
      return (ImIcons as any)[iconName];
    case "Io":
      return (IoIcons as any)[iconName];
    case "Lu":
      return (LuIcons as any)[iconName];
    case "Md":
      return (MdIcons as any)[iconName];
    case "Mf":
      return (MdIcons as any)[iconName];
    case "Ri":
      return (RiIcons as any)[iconName];
    case "Rx":
      return (RxIcons as any)[iconName];
    case "Si":
      return (SiIcons as any)[iconName];
    case "Sl":
      return (SlIcons as any)[iconName];
    case "Tb":
      return (TbIcons as any)[iconName];
    case "Tf":
      return (TfiIcons as any)[iconName];
    case "Ti":
      return (TiIcons as any)[iconName];
    case "Vs":
      return (VscIcons as any)[iconName];
    case "Wi":
      return (WiIcons as any)[iconName];
    default:
      return null;
  }
};
