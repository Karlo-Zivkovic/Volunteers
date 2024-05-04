import { useState } from "react";
import { MdDelete } from "react-icons/md";
import { Button, Col, Drawer, Form, Input, Row, Space, message } from "antd";
import axios from "axios";
import { Volunteer } from "../../types";
import { useAppContext } from "../../context";

interface ReviewsProps {
  item: Volunteer;
  fetchVolunteers: () => Promise<void>;
}

export default function Reviews({ item, fetchVolunteers }: ReviewsProps) {
  const { isAdmin } = useAppContext();
  const [form] = Form.useForm();
  const [open, setOpen] = useState<boolean>(false);
  const [reviewValue, setReviewValue] = useState<string>("");

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const handleFormSubmit = async () => {
    try {
      await form.validateFields();
      await axios.patch(`http://localhost:3000/volunteers/${item.id}`, {
        reviews: [reviewValue, ...item.reviews],
      });

      fetchVolunteers();

      form.resetFields();
    } catch (error) {
      console.error("Error adding a review: ", error);
      message.error("Failed to add the review!");
    }
  };

  const handleDeleteReview = async (deletingReview: string) => {
    const updatedReviews = item.reviews.filter(
      (review) => review !== deletingReview,
    );
    try {
      await axios.patch(`http://localhost:3000/volunteers/${item.id}`, {
        reviews: updatedReviews,
      });

      fetchVolunteers();
      message.success("Review deleted!");
    } catch (error) {
      console.error("Error deleting a review: ", error);
      message.error("Failed to delete the review!");
    }
  };

  return (
    <div className="absolute right-0 top-8 sm:static self-end">
      <div className="self-end mb-2">
        <button className="hover:underline text-blue-500" onClick={showDrawer}>
          Reviews &rarr;
        </button>
      </div>
      <Drawer
        title="Leave a Review!"
        width={720}
        onClose={onClose}
        open={open}
        styles={{
          body: {
            paddingBottom: 80,
          },
        }}
        extra={
          <Space>
            <Button onClick={onClose}>Cancel</Button>
            <Button
              onClick={handleFormSubmit}
              type="primary"
              // disabled={review === undefined}
              disabled={!reviewValue}
            >
              Submit
            </Button>
          </Space>
        }
      >
        <Form form={form} layout="vertical">
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="review"
                rules={[
                  {
                    required: true,
                    message: "Please describe this volunteer",
                  },
                  {
                    max: 400,
                    message: "Description must be at most 400 characters long!",
                  },
                ]}
              >
                <Input.TextArea
                  rows={4}
                  placeholder="Please describe this volunteer"
                  value={reviewValue}
                  onChange={(e) => setReviewValue(e.target.value)}
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>
        <div className="flex flex-col">
          {item.reviews.map((review, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md p-4 mb-4 flex justify-between"
              style={{ wordWrap: "break-word" }} // Ensure text wraps within the container
            >
              <p className="text-gray-700">{review}</p>
              {isAdmin && (
                <button onClick={() => handleDeleteReview(review)}>
                  <MdDelete
                    size={22}
                    className="hover:text-red-500 transition-all"
                  />
                </button>
              )}
            </div>
          ))}
        </div>{" "}
      </Drawer>
    </div>
  );
}
