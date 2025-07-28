import AllSkillLists from "@/components/skills/AllSkillLists";
import { getAllSkills } from "@/services/skillsService";

const AllSkillPage = async () => {
  const res = await getAllSkills();
  const mySkills =  res?.data ?? [];
 

  return (
    <div>
      <AllSkillLists />
    </div>
  );
};

export default AllSkillPage;
