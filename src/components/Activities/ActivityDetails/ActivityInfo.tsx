import {
  FaCalendarDays,
  FaHourglassHalf,
  FaLocationDot,
} from "react-icons/fa6";
import { IoTime } from "react-icons/io5";
import { Activity } from "../../../types";

interface ActivityInfoProps {
  activity: Activity;
}
export default function ActivityInfo({ activity }: ActivityInfoProps) {
  const openGoogleMaps = () => {
    if (!activity) return;
    const { latitude, longitude } = activity.coordinates;
    const mapsUrl = `https://www.google.com/maps?q=${latitude},${longitude}`;
    window.open(mapsUrl, "_blank");
  };
  return (
    <div className="grid grid-rows-2 grid-cols-2 gap-4 border-y py-4">
      <p className="flex items-center gap-4">
        <FaCalendarDays size={30} className="text-yellow-500" />
        {activity?.date}{" "}
      </p>
      <p
        onClick={() => openGoogleMaps()}
        className="flex items-center gap-4 cursor-pointer hover:underline text-blue-500 transition-all"
        title="Show me on map"
      >
        <FaLocationDot size={30} className="text-yellow-500" />
        {activity?.location}
      </p>
      <p className="flex items-center gap-4">
        <IoTime size={30} className="text-yellow-500" />
        {activity?.start_time}
      </p>
      <p className="flex items-center gap-4">
        <FaHourglassHalf size={30} className="text-yellow-500" />
        {activity?.duration}
      </p>
    </div>
  );
}
