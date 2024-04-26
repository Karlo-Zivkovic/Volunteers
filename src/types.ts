export type AppState = {
  isAdmin: boolean;
  setIsAdmin: React.Dispatch<React.SetStateAction<boolean>>;
};
export type Activity = {
  id: string;
  start_time: string;
  duration: string;
  coordinates: { latitude: string; longitude: string };
  association: string;
  title: string;
  img: string;
  description: string;
  content: string;
  date: string;
  location: string;
  volunteers: {id:string, name: string; img: string; city: string; email: string }[];
};
export type Volunteer = {
  id: string;
  name: string;
  img: string;
  city: string;
  email: string;
  type: TypeOfActivity[];
};

export type Association = {
  id: string;
  name: string;
  address: string;
  city: string;
};

enum TypeOfActivity {
  Ecology = "ecology",
  Education = "education",
  Transport = "transport",
  Any = "any",
}
