import { Activity } from "../../../types";
import React from "react";
import VolunteerRow from "./VolunteerRow";

interface ActivityDetailsVolunteersProps {
  activity: Activity;
  setActivity: React.Dispatch<React.SetStateAction<Activity | null>>;
}

export default function ActivityDetailsVolunteers({
  activity,
  setActivity,
}: ActivityDetailsVolunteersProps) {
  return (
    <>
      <h1 className="text-blue-500 text-2xl font-semibold mt-4">Volunteers</h1>
      <div className="flex flex-col gap-2 px-4 pt-2 pb-4 border border-gray-500 divide-y rounded-md mt-2">
        {activity.volunteers.map((volunteer) => {
          return (
            <VolunteerRow
              key={volunteer.id}
              volunteer={volunteer}
              activity={activity}
              setActivity={setActivity}
            />
          );
        })}
      </div>
    </>
  );
}
