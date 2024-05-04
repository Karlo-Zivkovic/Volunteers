import { Activity, Association, SortOptions, Volunteer } from "./types";
import { Rule } from "antd/lib/form";

export const calculateAverageRating = (volunteer: Volunteer) => {
  const ratings = volunteer.ratings;
  if (ratings.length === 0) return 0;
  const sum = ratings.reduce((acc, rating) => acc + rating, 0);
  const result = Number((sum / ratings.length).toFixed(1));
  return result;
};

export const capitalizeFirstLetter = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export function getCities(items: Volunteer[] | Activity[] | Association[]) {
  const cities = [...new Set(items.map((item) => item.location))].map(
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
          label: "Numbeer of volunteers",
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

export function getAssociationsSortOptions(
  cities: { value: string; label: string }[],
) {
  const sortAssociationOptions: SortOptions[] = [
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
      value: "reset",
      label: "Reset",
    },
  ];
  return sortAssociationOptions;
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
              value: "diverse",
              label: "Diverse",
            },
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
    {
      value: "sort",
      label: "Sort",
      children: [
        {
          value: "bestRated",
          label: "Best Rated",
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
          value: "numberOfRatings",
          label: "Number of Ratings",
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
      ],
    },
    {
      value: "reset",
      label: "Reset",
    },
  ];

  return sortVolunteersOptions;
}
export const validateAddress = (
  rule: Rule,
  value: string,
  callback: (error?: string) => void,
) => {
  const addressRegex = /^[a-zA-Z0-9\s,.'-]*$/;

  if (!value || value.match(addressRegex)) {
    callback();
  } else {
    callback("Please enter a valid address");
  }
};
