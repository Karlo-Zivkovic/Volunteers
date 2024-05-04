import { List, message } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { Volunteer } from "../../types";
import { getCities, getVolunteersSortOptions } from "../../utils";
import { useAppContext } from "../../context";
import Modal from "../Modal";
import AddVolunteerForm from "./AddVolunteerForm";
import { useSortItems } from "../useSortItems";
import SortFilter from "../SortFilter";
import VolunteerItem from "./VolunteerItem";
import Error from "../Error";

export default function Volunteers() {
  const { isAdmin } = useAppContext();
  const [initialVolunteers, setInitialVolunteers] = useState<Volunteer[] | []>(
    [],
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const { items, sortItems } = useSortItems(initialVolunteers) as {
    items: Volunteer[];
    sortItems: (sortOption: (string | number)[] | undefined) => void;
  };

  const cities = getCities(initialVolunteers);

  const fetchVolunteers = async () => {
    setLoading(true);
    try {
      const { data } = await axios("http://localhost:3000/volunteers");
      setInitialVolunteers(data);
    } catch (error) {
      console.error("Error fetching volunteers: ", error);
      setError(
        "An error occurred while fetching volunteers. Please try again later.",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVolunteers();
  }, []);

  const handleDeleteVolunteer = async (id: string) => {
    try {
      setLoading(true);
      await axios.delete(`http://localhost:3000/volunteers/${id}`);
      message.success("Volunteer deleted!");
      fetchVolunteers();
    } catch (error) {
      console.error("Error deleting a volunteer: ", error);
      message.error("Failed to delete a volunteer!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container min-h-[90vh] sm:w-[90%] w-full mx-auto  max-w-5xl p-6 sm:border-l sm:border-r sm:border-gray-300">
      <div className="flex justify-between mt-2 h-10 gap-4">
        <SortFilter
          options={getVolunteersSortOptions(cities)}
          sortItems={sortItems}
        />
        {isAdmin && (
          <Modal
            successMessage="New volunteer added!"
            buttonTitle="Add New Volunteer"
            modalTitle="Add new volunteer to the list!"
            FormComponent={AddVolunteerForm}
            fetch={fetchVolunteers}
          />
        )}
      </div>

      {error ? (
        <Error message={error} />
      ) : (
        <List
          pagination={{
            pageSize: 4,
            responsive: true,
          }}
          loading={loading}
          dataSource={items}
          renderItem={(item) => (
            <VolunteerItem
              item={item}
              handleDeleteVolunteer={handleDeleteVolunteer}
              fetchVolunteers={fetchVolunteers}
            />
          )}
        />
      )}
    </div>
  );
}
