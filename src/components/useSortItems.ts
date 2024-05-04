import { useEffect, useState } from "react";
import { Activity, Association, TypeOfActivity, Volunteer } from "../types";
import { calculateAverageRating } from "../utils";

export const useSortItems = (
  initialItems: (Volunteer | Activity | Association)[],
) => {
  const [items, setItems] = useState(initialItems);

  useEffect(() => {
    setItems(initialItems);
  }, [initialItems]);

  const sortItems = (sortOption: (string | number)[] | undefined) => {
    if (!items) return;
    if (!sortOption || sortOption[0] === "reset") {
      setItems(initialItems);
    } else {
      const sortOrder = sortOption[2] === "asc" ? 1 : -1;

      switch (sortOption[1]) {
        case "date":
          setItems(
            [...items].sort(
              (a, b) =>
                sortOrder *
                (new Date((a as Activity).date).getTime() -
                  new Date((b as Activity).date).getTime()),
            ),
          );
          break;
        case "location":
          setItems(
            [...initialItems].filter((item) => item.location === sortOption[2]),
          );
          break;
        case "numberOfVolunteers":
          setItems(
            [...items].sort(
              (a, b) =>
                sortOrder *
                ((a as Activity).volunteers.length -
                  (b as Activity).volunteers.length),
            ),
          );
          break;
        case "type":
          setItems(
            [...initialItems].filter((item) =>
              (item as Volunteer).type.includes(
                sortOption[2] as TypeOfActivity,
              ),
            ),
          );
          break;
        case "numberOfRatings":
          setItems(
            [...items].sort(
              (a, b) =>
                sortOrder *
                ((a as Volunteer).ratings.length -
                  (b as Volunteer).ratings.length),
            ),
          );
          break;
        case "bestRated":
          setItems(
            [...items].sort((a, b) => {
              const avgRatingA = calculateAverageRating(a as Volunteer);
              const avgRatingB = calculateAverageRating(b as Volunteer);
              return sortOrder * (avgRatingA - avgRatingB);
            }),
          );
          break;

        default:
          break;
      }
    }
  };

  return { items, sortItems };
};
