import UpdateSkills from "@/components/skills/UpdateSkills";
import { getSkillById } from "@/services/skillsService";

type PageProps = {
  params: {
    id: string;
  };
};

const UpdateSkillPage = async ({ params }: PageProps) => {
  const res = await getSkillById(params.id);
  const skills = res?.data ?? null;

  return <UpdateSkills skills={skills} />;
};

export default UpdateSkillPage;
