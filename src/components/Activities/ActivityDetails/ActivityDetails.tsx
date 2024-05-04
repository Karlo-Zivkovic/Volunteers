import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppContext } from "../../../context";
import { Activity } from "../../../types";
import axios from "axios";
import ListOfAttendees from "./ListOfAttendees";
import AddUserForm from "./AddUserForm";
import ActivityInfo from "./ActivityInfo";
import ActivityDetailsVolunteers from "./ActivityDetailsVolunteers";
import Modal from "../../Modal";
import Loading from "../../Loading";
import Error from "../../Error";
import { MdEdit } from "react-icons/md";
import EditActivityForm from "./EditActivityForm";

export default function ActivityDetails() {
  const { id } = useParams();
  const { isAdmin } = useAppContext();
  const navigate = useNavigate();
  const [activity, setActivity] = useState<Activity | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const fetchActivity = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `http://localhost:3000/activities/${id}`,
      );
      setActivity(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching activity details: ", error);
      setError("Error fetching activity details. Please try again later.");
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchActivity();
  }, [fetchActivity]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[80vh]">
        <Loading size={200} color="#3b82f6" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-[80vh]">
        <Error message={error} />
      </div>
    );
  }

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
          className="rounded-md object-cover xl:h-[20rem] h-full w-full"
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
          <div className="flex flex-end gap-3 items-center">
            {isAdmin && (
              <Modal
                successMessage="You have successfully edited the activity!"
                buttonTitle={<MdEdit size={22} />}
                modalTitle="Edit the activity!"
                FormComponent={EditActivityForm}
                fetch={fetchActivity}
                id={id}
              />
            )}
            <Modal
              successMessage="You have successfully joined the event!"
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
