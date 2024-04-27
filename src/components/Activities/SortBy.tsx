import { Cascader } from "antd";
import { SortOptions } from "../../types";

interface SortByProps {
  sortItems: (item: (string | number)[]) => void;
  options: SortOptions[];
}

export default function SortBy({ options, sortItems }: SortByProps) {
  const onChange = (value: (string | number)[]) => {
    sortItems(value);
  };

  return (
    <Cascader
      options={options}
      onChange={onChange}
      placeholder="Sort/Filter"
      // allowClear={true}
    />
  );
}
