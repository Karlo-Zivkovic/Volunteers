import { Cascader } from "antd";
import { capitalizeFirstLetter } from "../../utils";

interface Option {
  value: string;
  label: string;
  children?: Option[];
}

interface SortByProps {
  locations: string[];
  sortActivities: (item: (string | number)[]) => void;
}

export default function SortBy({ locations, sortActivities }: SortByProps) {
  const cities = locations?.map((item) => ({
    value: item,
    label: capitalizeFirstLetter(item),
  }));

  const options: Option[] = [
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
    {
      value: "location",
      label: "Location",
      children: cities,
    },
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
  ];

  const onChange = (value: (string | number)[]) => {
    sortActivities(value);
    // console.log(value);
  };

  return (
    <Cascader
      options={options}
      onChange={onChange}
      placeholder="Sort By"
      // allowClear={true}
    />
  );
}
