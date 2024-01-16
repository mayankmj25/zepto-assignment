export interface User {
  id: number;
  name: string;
  email: string;
}

export interface ChipInputProps {
  users: User[];
}

export interface ChipProps {
  label: string;
  onRemove: () => void;
  isHighlighted?: boolean;
}
