import AllSkillLists from "@/components/skills/AllSkillLists";
import { getAllSkills } from "@/services/skillsService";

const AllSkillPage = async () => {
  const res = await getAllSkills();
  const mySkills =  res?.data ?? [];
 

  return (
    <div>
      <AllSkillLists mySkills={mySkills} />
    </div>
  );
};

export default AllSkillPage;
