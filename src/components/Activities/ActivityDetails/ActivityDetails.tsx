import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppContext } from "../../../context";
import { Activity } from "../../../types";
import axios from "axios";
import ListOfAttendees from "./ListOfAttendees";
import AddUserForm from "./AddUserForm";
import ActivityInfo from "./ActivityInfo";
import ActivityDetailsVolunteers from "./ActivityDetailsVolunteers";
import AddUser_AddActivity_Modal from "../AddUser_AddActivity_Modal";

export default function ActivityDetails() {
  const { id } = useParams();
  const { isAdmin } = useAppContext();
  const navigate = useNavigate();
  const [activity, setActivity] = useState<Activity | null>(null);

  const fetchActivity = useCallback(async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:3000/activities/${id}`,
      );
      setActivity(data);
    } catch (error) {
      console.error("Error fetching activity? details:", error);
    }
  }, [id]);

  useEffect(() => {
    fetchActivity();
  }, [fetchActivity]);

  return (
    <div className="container mx-auto p-10 flex flex-col gap-4 xl:gap-10 xl:flex-row">
      <div>
        <button
          onClick={() => navigate(-1)}
          className="text-blue-500 text-start hover:underline hover:text-blue-600"
        >
          &larr; Back
        </button>
      </div>
      <div>
        <img
          src={activity?.img}
          alt="Volunteering in action"
          className="rounded-md object-cover xl:h-[20rem]"
        />
      </div>
      <div className="flex-[2] flex flex-col gap-2.5">
        <h1 className="font-bold text-2xl md:text-3xl border-b border-gray-500 pb-4 pr-6">
          {activity?.title} -{" "}
          <span className="text-xl md:text-2xl italic font-semibold text-blue-500">
            {activity?.association}
          </span>
        </h1>
        <p className="text-base md:text-lg font-semibold opacity-50 py-2">
          {activity?.description}
        </p>
        <ActivityInfo activity={activity!} />
        <p className="text-lg md:text-xl italic font-medium py-2">
          {activity?.content}
        </p>
        <div className="flex justify-between mt-5">
          <ListOfAttendees volunteers={activity?.volunteers} />
          <div className="flex flex-end gap-3">
            <AddUser_AddActivity_Modal
              id={id!}
              volunteers={activity?.volunteers}
              fetch={fetchActivity}
              FormComponent={AddUserForm}
              buttonTitle="Join Us"
              modalTitle="Be a part of this event!"
            />
          </div>
        </div>
        {isAdmin && activity?.volunteers && activity.volunteers.length > 0 && (
          <ActivityDetailsVolunteers
            activity={activity}
            setActivity={setActivity}
          />
        )}
      </div>
    </div>
  );
}
