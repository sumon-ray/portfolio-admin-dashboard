export interface ISkill {
    _id: string;
    name: string;
    type: 'technical' | 'soft';
    proficiency: 'beginner' | 'intermediate' | 'advanced' | 'expert';
    icon?: string;
    createdAt?: string;
    updatedAt?: string;
  }
  