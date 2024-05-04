import { Avatar, Flex, List } from "antd";
import { Volunteer } from "../../types";
import { FaCity, FaRegStar } from "react-icons/fa6";
import { HiSpeakerphone } from "react-icons/hi";
import { CgMail } from "react-icons/cg";
import Rating from "./Rating";
import Reviews from "./Reviews";
import { useAppContext } from "../../context";
import { MdDelete, MdEdit } from "react-icons/md";
import Modal from "../Modal";
import EditVolunteerForm from "./EditVolunteerFrom";

interface VolunteerItemProps {
  item: Volunteer;
  handleDeleteVolunteer: (id: string) => Promise<void>;
  fetchVolunteers: () => Promise<void>;
}
export default function VolunteerItem({
  item,
  handleDeleteVolunteer,
  fetchVolunteers,
}: VolunteerItemProps) {
  const { isAdmin } = useAppContext();

  return (
    <List.Item className="relative">
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
          <div className="flex gap-3 items-start justify-between flex-col">
            <div className="flex gap-2 items-center">
              <FaCity size={20} className="text-yellow-500" />
              <p className="text-sm sm:text-base md:text-xl">{item.location}</p>
            </div>
            <div className="flex gap-2 items-center">
              <HiSpeakerphone size={20} className="text-yellow-500" />
              <p className="text-sm sm:text-base md:text-xl">
                {item.type.map((word, index) => (
                  <span key={index}>
                    {index === 0
                      ? word.charAt(0).toUpperCase() + word.slice(1)
                      : `, ${word.charAt(0).toUpperCase() + word.slice(1)}`}
                  </span>
                ))}
              </p>
            </div>
            <div className="flex gap-2 items-center">
              <CgMail size={25} className="text-yellow-500" />
              <p className="text-sm sm:text-base md:text-xl">{item.email}</p>
            </div>
            <Flex
              gap="middle"
              className="items-center text-sm sm:text-lg sm:absolute top-8 right-0"
            >
              <FaRegStar size={25} className="text-yellow-500 sm:hidden" />
              <Rating item={item} fetchVolunteers={fetchVolunteers} />
            </Flex>
          </div>
        }
      />
      <Reviews item={item} fetchVolunteers={fetchVolunteers} />

      {isAdmin && (
        <div className="sm:px-4 flex gap-1 self-end sm:gap-4">
          <button
            onClick={() => handleDeleteVolunteer(item.id)}
            className="text-red-800 hover:text-red-600 transition-all"
          >
            <MdDelete size={25} />
          </button>
          <Modal
            successMessage="You have successfully edited the volunteer!"
            buttonTitle={<MdEdit size={22} />}
            modalTitle="Edit the volunteer!"
            FormComponent={EditVolunteerForm}
            fetch={fetchVolunteers}
            id={item.id}
          />
        </div>
      )}
    </List.Item>
  );
}
