import UpdateProjectForm from "@/components/project/update";
import { getProjectById } from "@/services/projectService";

type PageProps = {
  params: {
    id: string;
  };
};

const updatePage = async ({ params }: PageProps) => {
  const response = await getProjectById(params.id);
  const project = response?.data ?? null;

  return (
    <div>
      <UpdateProjectForm project={project} />
    </div>
  );
};

export default updatePage;
