import {
  FaCalendarDays,
  FaHourglassHalf,
  FaLocationDot,
} from "react-icons/fa6";
import { IoTime } from "react-icons/io5";
import { Activity } from "../../../types";
import moment from "moment";

interface ActivityInfoProps {
  activity: Activity;
}
export default function ActivityInfo({ activity }: ActivityInfoProps) {
  return (
    <div className="grid grid-rows-2 grid-cols-2 gap-4 border-y py-4">
      <p className="flex items-center gap-4">
        <FaCalendarDays size={30} className="text-yellow-500" />
        <span>{moment(activity?.date).format("DD MMM YYYY")}</span>
      </p>
      <p className="flex items-center gap-4" title="Show me on map">
        <FaLocationDot size={30} className="text-yellow-500" />
        {activity?.location}
      </p>
      <p className="flex items-center gap-4">
        <IoTime size={30} className="text-yellow-500" />
        {moment(activity?.start_time).format("h:mm A")}
      </p>
      <p className="flex items-center gap-4">
        <FaHourglassHalf size={30} className="text-yellow-500" />
        {activity?.duration}
      </p>
    </div>
  );
}
