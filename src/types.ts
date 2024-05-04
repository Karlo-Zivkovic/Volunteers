export type AppState = {
  isAdmin: boolean;
  setIsAdmin: React.Dispatch<React.SetStateAction<boolean>>;
};
export type Activity = {
  id: string;
  start_time: string;
  duration: string;
  association: string;
  title: string;
  img: string;
  description: string;
  content: string;
  date: string;
  location: string;
  volunteers: {
    id: string;
    name: string;
    img: string;
    email: string;
  }[];
};
export type Volunteer = {
  id: string;
  name: string;
  img: string;
  location: string;
  ratings: number[];
  reviews: string[];
  email: string;
  type: TypeOfActivity[];
};

export enum TypeOfActivity {
  ecology = "ecology",
  education = "education",
  transport = "transport",
  diverse = "diverse",
}

export type Association = {
  id: string;
  name: string;
  address: string;
  location: string;
  type: string[];
  email: string;
};

export type SortOptions = {
  value: string;
  label: string;
  children?: SortOptions[];
};
