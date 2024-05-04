import { useEffect, useState } from "react";
import { List, Grid, message } from "antd";
import axios from "axios";
import { Association } from "../../types";
import { useAppContext } from "../../context";
import { getAssociationsSortOptions, getCities } from "../../utils";
import Modal from "../Modal";
import RequestNewAssociationForm from "./RequestNewAssociationFrom";
import RequestedAssociations from "./RequestedAssociations";
import AssociationItem from "./AssociationItem";
import { useSortItems } from "../useSortItems";
import SortFilter from "../SortFilter";
import Error from "../Error";

const { useBreakpoint } = Grid;

export default function Associations() {
  const { isAdmin } = useAppContext();
  const breakpoints = useBreakpoint();
  const columnCount = breakpoints.lg
    ? 3
    : breakpoints.md || breakpoints.sm
      ? 2
      : 1;
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const [initialAssociations, setInitialAssociations] = useState<
    Association[] | []
  >([]);

  const [requestedAssociations, setRequestedAssociations] = useState<
    Association[] | []
  >([]);

  const { items, sortItems } = useSortItems(initialAssociations) as {
    items: Association[];
    sortItems: (sortOption: (string | number)[] | undefined) => void;
  };

  const cities = getCities(initialAssociations);

  const fetchAssociations = async () => {
    setLoading(true);
    try {
      const { data } = await axios("http://localhost:3000/associations");
      setInitialAssociations(data);
    } catch (error) {
      console.error("Error fetching associations: ", error);
      setError(
        "An error occurred while fetching associations. Please try again later.",
      );
    } finally {
      setLoading(false);
    }
  };

  const fetchRequestedAssociations = async () => {
    setLoading(true);
    try {
      const { data } = await axios(
        "http://localhost:3000/requestedAssociations",
      );
      setRequestedAssociations(data);
    } catch (error) {
      console.error("Error fetching associations: ", error);
      setError(
        "An error occurred while fetching associations. Please try again later.",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAssociations();
    fetchRequestedAssociations();
  }, []);

  const handleDeleteAssociation = async (id: string) => {
    try {
      await axios.delete(`http://localhost:3000/associations/${id}`);
      message.success("Association deleted!");
      fetchAssociations();
    } catch (error) {
      console.error("Error deleting association: ", error);
      message.error("Failed to delete an association!");
    }
  };

  return (
    <div className="max-w-5xl mx-auto sm:border-l sm:border-r sm:border-gray-300 min-h-[80vh]">
      <div className="pt-8 px-10 flex justify-between gap-4">
        <SortFilter
          options={getAssociationsSortOptions(cities)}
          sortItems={sortItems}
        />
        <Modal
          successMessage=""
          buttonTitle="Request new"
          modalTitle="Request new association to the list!"
          FormComponent={RequestNewAssociationForm}
          fetch={fetchRequestedAssociations}
        />
      </div>
      {error ? (
        <div className="mt-4 px-10">
          <Error message={error} />
        </div>
      ) : (
        <List
          grid={{ gutter: 16, column: columnCount }}
          loading={loading}
          pagination={{
            pageSize: 6,
            responsive: true,
          }}
          className="px-4 sm:px-10 pt-10 pb-5 h-full"
          dataSource={items}
          renderItem={(item) => (
            <AssociationItem
              item={item}
              handleDeleteAssociation={handleDeleteAssociation}
            />
          )}
        />
      )}
      {isAdmin && !loading && requestedAssociations.length > 0 && (
        <RequestedAssociations
          columnCount={columnCount}
          items={requestedAssociations}
          fetchRequestedAssociations={fetchRequestedAssociations}
          fetchAssociations={fetchAssociations}
        />
      )}
    </div>
  );
}
