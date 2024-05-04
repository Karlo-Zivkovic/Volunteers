import { Divider, List, message } from "antd";
import { Association } from "../../types";
import AssociationItem from "./AssociationItem";
import axios from "axios";

interface RequestedAssociationsProps {
  columnCount: number;
  items: Association[];
  fetchRequestedAssociations: () => Promise<void>;
  fetchAssociations: () => Promise<void>;
}

export default function RequestedAssociations({
  items,
  columnCount,
  fetchRequestedAssociations,
  fetchAssociations,
}: RequestedAssociationsProps) {
  const handleDeleteAssociation = async (id: string) => {
    try {
      await axios.delete(`http://localhost:3000/requestedAssociations/${id}`);
      message.success("Association deleted!");
      fetchRequestedAssociations();
    } catch (error) {
      console.error("Error deleting association: ", error);
      message.error("Failed to delete an association!");
    }
  };

  const handleUpgradeAssociation = async (item: Association) => {
    try {
      await axios.post("http://localhost:3000/associations", item);
      handleDeleteAssociation(item.id);
      message.success("Association added to the list!");
      fetchAssociations();
    } catch (error) {
      console.error("Error enlisting the association: ", error);
      message.error("Failed to enlist an association!");
    }
  };

  return (
    <>
      <Divider />
      <List
        grid={{ gutter: 16, column: columnCount }}
        pagination={{
          pageSize: 6,
          responsive: true,
        }}
        className="px-10 pt-5 pb-10"
        dataSource={items}
        renderItem={(item) => (
          <AssociationItem
            item={item}
            handleDeleteAssociation={handleDeleteAssociation}
            handleUpgradeAssociation={handleUpgradeAssociation}
            requestedAssociationMode={true}
          />
        )}
      />{" "}
    </>
  );
}
