import { useEffect, useState } from "react";
import { Activity } from "../../types";

export const useSortActivities = (initialActivities: Activity[]) => {
  const [activities, setActivities] = useState<Activity[]>(initialActivities);

  useEffect(() => {
    setActivities(initialActivities);
  }, [initialActivities]);

  const sortActivities = (sortOption: (string | number)[] | undefined) => {
    if (!activities) return;
    if (!sortOption) {
      setActivities(initialActivities);
    } else {
      const sortOrder = sortOption[1] === "asc" ? 1 : -1;

      switch (sortOption[0]) {
        case "date":
          setActivities(
            [...activities].sort(
              (a, b) =>
                sortOrder *
                (new Date(a.date).getTime() - new Date(b.date).getTime()),
            ),
          );
          break;
        case "location":
          setActivities(
            [...initialActivities].filter(
              (item) => item.location === sortOption[1],
            ),
          );
          break;
        case "numberOfVolunteers":
          setActivities(
            [...activities].sort(
              (a, b) => sortOrder * (a.volunteers.length - b.volunteers.length),
            ),
          );
          break;
        default:
          break;
      }
    }
  };

  return { activities, sortActivities };
};
