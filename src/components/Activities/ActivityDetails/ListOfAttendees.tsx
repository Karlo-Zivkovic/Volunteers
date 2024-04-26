import { Avatar } from "antd";
import { useEffect, useState } from "react";

interface ListOfAttendeesProps {
  volunteers:
    | { name: string; img: string; city: string; email: string }[]
    | undefined;
}

export default function ListOfAttendees({ volunteers }: ListOfAttendeesProps) {
  const [maxCount, setMaxCount] = useState<number>(10);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setMaxCount(3);
      } else {
        setMaxCount(10);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <Avatar.Group
      maxCount={maxCount}
      size="large"
      maxStyle={{ color: "#f56a00", backgroundColor: "#fde3cf", zIndex: 30 }}
      className=""
    >
      {volunteers?.map((volunteer, index) => (
        <Avatar src={volunteer?.img} key={index} size={50} />
      ))}
    </Avatar.Group>
  );
}
