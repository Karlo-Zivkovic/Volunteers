import { Card, List } from "antd";
import { GrUpgrade } from "react-icons/gr";
import { FaCity, FaRegAddressCard } from "react-icons/fa";
import { Association } from "../../types";
import { CgMail } from "react-icons/cg";
import { HiSpeakerphone } from "react-icons/hi";
import { MdDelete } from "react-icons/md";
import { useAppContext } from "../../context";

interface AssociationItemProps {
  item: Association;
  handleDeleteAssociation: (id: string) => void;
  requestedAssociationMode?: boolean;
  handleUpgradeAssociation?: (item: Association) => void;
}

export default function AssociationItem({
  item,
  handleDeleteAssociation,
  handleUpgradeAssociation,
  requestedAssociationMode = false,
}: AssociationItemProps) {
  const { isAdmin } = useAppContext();
  return (
    <List.Item>
      <Card
        title={
          <div className="flex justify-between items-center">
            <p className="text-blue-500">{item.name}</p>
            {isAdmin && (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleDeleteAssociation(item.id)}
                  className="text-red-800 hover:text-red-600 transition-all"
                >
                  <MdDelete size={25} />
                </button>
                {requestedAssociationMode && handleUpgradeAssociation && (
                  <button
                    onClick={() => handleUpgradeAssociation(item)}
                    className="text-green-800 hover:text-green-600 transition-all"
                  >
                    <GrUpgrade size={25} />
                  </button>
                )}
              </div>
            )}
          </div>
        }
      >
        <div className="flex flex-col gap-4 h-[11rem]">
          <div className="flex gap-4 items-center">
            <div>
              <FaRegAddressCard size={30} className="text-yellow-500" />
            </div>
            <p>{item.address}</p>
          </div>
          <div className="flex gap-4 items-center">
            <div>
              <FaCity size={30} className="text-yellow-500" />
            </div>
            <p>{item.location}</p>
          </div>

          <div className="flex gap-4 items-center">
            <div>
              <CgMail size={30} className="text-yellow-500" />
            </div>
            <p>{item.email}</p>
          </div>
          <div className="flex gap-4 items-center">
            <div>
              <HiSpeakerphone size={30} className="text-yellow-500" />
            </div>
            <p>
              {item.type.map((word, index) => (
                <span key={index}>
                  {index === 0
                    ? word.charAt(0).toUpperCase() + word.slice(1)
                    : `, ${word.charAt(0).toUpperCase() + word.slice(1)}`}
                </span>
              ))}
            </p>
          </div>
        </div>
      </Card>
    </List.Item>
  );
}
