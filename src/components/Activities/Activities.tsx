import { List, message } from "antd";
import { useEffect, useState } from "react";
import { FaCalendarDays } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useAppContext } from "../../context";
import { useSortActivities } from "./useSortActivities";
import { Activity } from "../../types";
import axios from "axios";
import AddUser_AddActivity_Modal from "./AddUser_AddActivity_Modal";
import SortBy from "./SortBy";
import AddActivityForm from "./AddActivityForm";

export default function Activities() {
  const { isAdmin } = useAppContext();
  const [initialActivities, setInitialActivities] = useState<Activity[] | []>(
    [],
  );
  const { activities, sortActivities } = useSortActivities(initialActivities);

  const locations = [...new Set(activities?.map((item) => item.location))];

  const fetchActivities = async () => {
    const { data } = await axios("http://localhost:3000/activities");
    setInitialActivities(data);
  };

  useEffect(() => {
    fetchActivities();
  }, []);

  const handleDeleteActivity = (id: string) => {
    const deleteActivity = async () => {
      await axios.delete(`http://localhost:3000/activities/${id}`);
    };
    deleteActivity();
    message.success("Event deleted!");
    fetchActivities();
  };

  return (
    <div className="bg-orange-50 ">
      <div className="max-w-6xl min-h-[90vh] mx-auto p-4 border-l border-r border-gray-300">
        <div className="flex justify-between px-6 mt-4 gap-4">
          <SortBy locations={locations} sortActivities={sortActivities} />
          <AddUser_AddActivity_Modal
            buttonTitle="Add New Activity"
            modalTitle="Add new activity to the list!"
            FormComponent={AddActivityForm}
            fetch={fetchActivities}
          />
        </div>
        <List
          itemLayout="vertical"
          size="large"
          pagination={{
            onChange: (page) => {
              console.log(page);
            },
            pageSize: 3,
            responsive: true,
          }}
          dataSource={activities}
          renderItem={(item) => (
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
                <div className="flex gap-4 text-blue-400 w-full justify-center sm:justify-start">
                  <FaCalendarDays />
                  <p>{item.date}</p>
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
          )}
        />
      </div>
    </div>
  );
}
