export interface UserRowProps {
    id: string;
    avatar?: string | null;
    name: string;
    email: string;
    role: string;
    status: "Active" | "Inactive";
    isSelected: boolean;
    onSelect: (id: string) => void;
  }
  
  export interface ReviewFilter {
    rating?: number;
    user?: string;
  }