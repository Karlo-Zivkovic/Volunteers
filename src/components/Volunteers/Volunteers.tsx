import { Avatar, List } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { FaCity } from "react-icons/fa";
// import { Volunteer } from "../types";
import { CgMail } from "react-icons/cg";
import { HiSpeakerphone } from "react-icons/hi";
import { Volunteer } from "../../types";
import SortBy from "../Activities/SortBy";
import { getCities, getVolunteersSortOptions } from "../../utils";
import { useSortItems } from "../Activities/useSortActivities";

export default function Volunteers() {
  const [initialVolunteers, setInitialVolunteers] = useState<Volunteer[] | []>(
    [],
  );

  const { items, sortItems } = useSortItems(initialVolunteers) as {
    items: Volunteer[];
    sortItems: (sortOption: (string | number)[] | undefined) => void;
  };

  const cities = getCities(initialVolunteers);
  useEffect(() => {
    const fetchVolunteers = async () => {
      const { data } = await axios("http://localhost:3000/volunteers");
      setInitialVolunteers(data);
    };
    fetchVolunteers();
  }, []);

  return (
    <div className="container w-[90%] mx-auto  max-w-5xl p-6 border-l border-r border-gray-300">
      <SortBy
        options={getVolunteersSortOptions(cities)}
        sortItems={sortItems}
      />

      <List
        pagination={{
          onChange: (page) => {
            console.log(page);
          },
          pageSize: 5,
          responsive: true,
        }}
        dataSource={items}
        renderItem={(item) => (
          <List.Item>
            <List.Item.Meta
              className="py-2"
              avatar={
                <Avatar
                  src={item.img}
                  className="h-14 w-14 sm:h-20 sm:w-20 md:h-28 md:w-28"
                />
              }
              title={<p className="text-2xl sm:text-3xl">{item.name}</p>}
              description={
                <div className="flex gap-3 items-start justify-between flex-col lg:flex-row">
                  <div className="flex gap-2 items-center">
                    <FaCity size={20} className="text-yellow-500" />
                    <p className="text-lg sm:text-xl">{item.location}</p>
                  </div>
                  <div className="flex gap-2 items-center">
                    <HiSpeakerphone size={20} className="text-yellow-500" />
                    <p className="text-lg sm:text-xl">
                      {item.type.map((word, index) => (
                        <span key={index}>
                          {index === 0
                            ? word.charAt(0).toUpperCase() + word.slice(1)
                            : `, ${
                                word.charAt(0).toUpperCase() + word.slice(1)
                              }`}
                        </span>
                      ))}
                    </p>
                  </div>
                  <div className="flex gap-2 items-center">
                    <CgMail size={25} className="text-yellow-500" />
                    <p className="text-lg sm:text-xl">{item.email}</p>
                  </div>
                </div>
              }
            />
          </List.Item>
        )}
      />
    </div>
  );
}
