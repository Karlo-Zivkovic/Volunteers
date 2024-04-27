import { useEffect, useState } from "react";
import { Activity, TypeOfActivity, Volunteer } from "../../types";

export const useSortItems = (initialItems: (Volunteer | Activity)[]) => {
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
        default:
          break;
      }
    }
  };

  return { items, sortItems };
};
