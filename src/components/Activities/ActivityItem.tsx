import { List } from "antd";
import { Activity } from "../../types";
import { FaCalendarDays } from "react-icons/fa6";
import { useAppContext } from "../../context";
import { Link } from "react-router-dom";
import moment from "moment";

interface ActivityItemProps {
  item: Activity;
  handleDeleteActivity: (id: string) => Promise<void>;
}

export default function ActivityItem({
  item,
  handleDeleteActivity,
}: ActivityItemProps) {
  const { isAdmin } = useAppContext();
  return (
    <List.Item
      key={item.id}
      extra={
        <img
          className="object-cover h-[14rem] w-[20rem] min-[570px]:h-[12rem] min-[570px]:w-[12rem] lg:h-[15rem] lg:w-[25rem] rounded-md"
          alt="Volunteering in action"
          src={item.img}
        />
      }
    >
      <List.Item.Meta
        title={
          <p className="text-3xl font-semibold uppercase text-center min-[570px]:text-left">
            {item.title}
          </p>
        }
        description={
          <p className="text-lg font-semibold opacity-50 text-center sm:text-left">
            {item.description}
          </p>
        }
      />
      <div className="text-2xl flex flex-col md:flex-row gap-4 items-center justify-end md:mt-20 lg:mt-28">
        <div className="flex gap-4 text-blue-400 w-full justify-center sm:justify-start items-center">
          <FaCalendarDays />
          <p>{moment(item.date).format("DD MMM YYYY")}</p>
        </div>
        <div className="flex gap-2 sm:self-start">
          {isAdmin && (
            <button
              onClick={() => handleDeleteActivity(item.id)}
              className="rounded-md bg-red-400 text-white font-semibold px-4 py-2.5 text-xl hover:bg-red-500 transition-all"
            >
              Delete
            </button>
          )}
          <Link
            to={`/activities/${item.id}`}
            className="text-center md:w-48 px-4 py-2.5 text-xl bg-yellow-500 text-white rounded-md font-semibold hover:bg-yellow-400 transition-all hover:text-white"
          >
            View More
          </Link>
        </div>
      </div>
    </List.Item>
  );
}
