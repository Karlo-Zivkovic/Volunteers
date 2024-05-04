import { List, message } from "antd";
import { useEffect, useState } from "react";
import { Activity } from "../../types";
import axios from "axios";
import AddActivityForm from "./AddActivityForm";
import { getActivitesSortOptions, getCities } from "../../utils";
import Modal from "../Modal";
import { useSortItems } from "../useSortItems";
import SortFilter from "../SortFilter";
import ActivityItem from "./ActivityItem";
import Error from "../Error";

export default function Activities() {
  const [initialActivities, setInitialActivities] = useState<Activity[] | []>(
    [],
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const { items, sortItems } = useSortItems(initialActivities) as {
    items: Activity[];
    sortItems: (sortOption: (string | number)[] | undefined) => void;
  };

  const cities = getCities(initialActivities);

  const fetchActivities = async () => {
    setLoading(true);
    try {
      const { data } = await axios("http://localhost:3000/activities");
      setInitialActivities(data);
    } catch (error) {
      console.error("Error fetching activities: ", error);
      setError(
        "An error occurred while fetching activities. Please try again later.",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchActivities();
  }, []);

  const handleDeleteActivity = async (id: string) => {
    try {
      setLoading(true);
      await axios.delete(`http://localhost:3000/activities/${id}`);
      message.success("Activity deleted!");
      fetchActivities();
    } catch (error) {
      console.error("Error deleting activity:", error);
      message.error("Failed to delete activity!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-orange-50">
      <div className="max-w-6xl min-h-[90vh] mx-auto p-6 border-l border-r border-gray-300">
        <div className="flex justify-between px-6 mt-4 gap-4">
          <SortFilter
            options={getActivitesSortOptions(cities)}
            sortItems={sortItems}
          />
          <Modal
            successMessage="You have successfully added the activity!"
            buttonTitle="Add New Activity"
            modalTitle="Add new activity to the list!"
            FormComponent={AddActivityForm}
            fetch={fetchActivities}
          />
        </div>
        {error ? (
          <Error message={error} />
        ) : (
          <List
            itemLayout="vertical"
            size="large"
            loading={loading}
            pagination={{
              pageSize: 3,
              responsive: true,
            }}
            dataSource={items}
            renderItem={(item) => (
              <ActivityItem
                item={item}
                handleDeleteActivity={handleDeleteActivity}
              />
            )}
          />
        )}
      </div>
    </div>
  );
}
