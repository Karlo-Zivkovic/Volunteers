import { Cascader } from "antd";
import { SortOptions } from "../types";

interface SortFilterProps {
  sortItems: (item: (string | number)[]) => void;
  options: SortOptions[];
}

export default function SortFilter({ options, sortItems }: SortFilterProps) {
  const onChange = (value: (string | number)[]) => {
    sortItems(value);
  };

  return (
    <Cascader
      options={options}
      onChange={onChange}
      placeholder="Sort/Filter"
    />
  );
}
