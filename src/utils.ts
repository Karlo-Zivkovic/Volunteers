import { Activity, SortOptions, Volunteer } from "./types";

export const capitalizeFirstLetter = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export function getCities(items: Volunteer[] | Activity[]) {
  const cities = [...new Set(items?.map((item) => item.location))]?.map(
    (item) => ({
      value: item,
      label: capitalizeFirstLetter(item),
    }),
  );
  return cities;
}

export function getActivitesSortOptions(
  cities: { value: string; label: string }[],
) {
  const sortActivitesOptions: SortOptions[] = [
    {
      value: "filter",
      label: "Filter",
      children: [
        {
          value: "location",
          label: "Location",
          children: cities,
        },
      ],
    },
    {
      value: "sort",
      label: "Sort",
      children: [
        {
          value: "numberOfVolunteers",
          label: "Numbeer Of Volunteers",
          children: [
            {
              value: "asc",
              label: "Ascending",
            },
            {
              value: "desc",
              label: "Descending",
            },
          ],
        },
        {
          value: "date",
          label: "Date",
          children: [
            {
              value: "asc",
              label: "Newest to Oldest",
            },
            {
              value: "desc",
              label: "Oldest to Newest",
            },
          ],
        },
      ],
    },
    {
      value: "reset",
      label: "Reset",
    },
  ];
  return sortActivitesOptions;
}

export function getVolunteersSortOptions(
  cities: { value: string; label: string }[],
) {
  const sortVolunteersOptions: SortOptions[] = [
    {
      value: "filter",
      label: "Filter",
      children: [
        {
          value: "location",
          label: "Location",
          children: cities,
        },
        {
          value: "type",
          label: "Type",
          children: [
            {
              value: "education",
              label: "Education",
            },
            {
              value: "ecology",
              label: "Ecology",
            },
            {
              value: "transport",
              label: "Transport",
            },
          ],
        },
      ],
    },
  ];

  return sortVolunteersOptions;
}
