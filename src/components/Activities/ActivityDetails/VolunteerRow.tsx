import { message } from "antd";
import { MdOutlineEmail } from "react-icons/md";
import axios from "axios";
import { Activity } from "../../../types";

interface VolunteerRowProps {
  volunteer: {
    id: string;
    name: string;
    email: string;
    img: string;
  };
  activity: Activity;
  setActivity: React.Dispatch<React.SetStateAction<Activity | null>>;
}
export default function VolunteerRow({
  volunteer,
  activity,
  setActivity,
}: VolunteerRowProps) {
  async function handleDeleteVolunteer(
    activity: Activity,
    volunteerId: string,
  ) {
    try {
      const updatedVolunteers = activity.volunteers.filter(
        (volunteer) => volunteer.id !== volunteerId,
      );
      activity.volunteers = updatedVolunteers;
      await axios.put(
        `http://localhost:3000/activities/${activity.id}`,
        activity,
      );
      message.success("Volunteer successfully deleted from the event!");
      const { data } = await axios.get(
        `http://localhost:3000/activities/${activity.id}`,
      );
      setActivity(data);
    } catch (error) {
      message.error("An error occurred while deleting the volunteer.");
      console.error("Error deleting volunteer: ", error);
    }
  }
  return (
    <div className="flex gap-4 items-center pt-2 container">
      <img
        src={volunteer.img}
        className="h-12 rounded-full"
        alt="Volunteer profile picture"
      />
      <div className="flex flex-col gap-1 grow min-[530px]:flex-row min-[530px]:items-center min-[530px]:gap-2 min-[530px]:justify-between">
        <p className="text-sm sm:text-base font-medium md:text-lg xl:text-sm 2xl:text-lg">
          {volunteer.name}
        </p>
        <div className="flex items-center gap-2 text-xs sm:text-sm md:text-base text-gray-700 italic xl:text-xs 2xl:text-base">
          <MdOutlineEmail className="text-yellow-500" />
          {volunteer.email}
        </div>
        <button
          onClick={() => handleDeleteVolunteer(activity, volunteer.id)}
          className="px-4 py-1.5 mt-2 rounded-md bg-red-400 text-white font-semibold text-sm hover:bg-red-500 transition-all min-[500px]:mt-0"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
