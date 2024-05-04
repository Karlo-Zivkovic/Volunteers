import { Button, Form, Input, message, InputNumber } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { Activity } from "../../../types";
import Loading from "../../Loading";

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 5 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 14 },
  },
};

type FormType = {
  title: string;
  img: string;
  description: string;
  content: string;
  duration: string;
  location: string;
  association: string;
  volunteers: { name: string; email: string; img: string }[];
};

interface EditActivityFormProps {
  handleOk: () => void;
  id: string;
}

export default function EditActivityForm({
  handleOk,
  id,
}: EditActivityFormProps) {
  const [activity, setActivity] = useState<Activity | undefined>(undefined);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchActivity = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/activities/${id}`,
        );
        setActivity(response.data);

        form.setFieldsValue(response.data);
      } catch (error) {
        console.error("Error fetching activity: ", error);
      }
    };
    fetchActivity();
  }, [id, form]);

  const onFinish = async (formData: FormType) => {
    try {
      setLoading(true);
      await axios.patch(`http://localhost:3000/activities/${id}`, formData);
      handleOk();
    } catch (error) {
      console.error("Error adding activity: ", error);
      message.error("Failed to edit the activity!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form
      {...formItemLayout}
      form={form}
      variant="filled"
      style={{ maxWidth: 1200 }}
      onFinish={onFinish}
      className="py-4"
      initialValues={activity}
    >
      <Form.Item
        label="Title"
        name="title"
        initialValue={activity?.title}
        rules={[
          { required: true, message: "Please input the title!" },
          { max: 25, message: "Title must be at most 25 characters long!" },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Image Url"
        name="img"
        rules={[
          { required: true, message: "Please input the image url!" },
          { type: "url", message: "Please enter a valid URL!" },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Description"
        name="description"
        rules={[
          { required: true, message: "Please input the description!" },
          {
            max: 150,
            message: "Description must be at most 150 characters long!",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Content"
        name="content"
        rules={[
          { required: true, message: "Please input the content!" },
          { max: 500, message: "Content must be at most 500 characters long!" },
        ]}
      >
        <Input.TextArea />
      </Form.Item>
      <Form.Item
        label="Duration (h)"
        name="duration"
        rules={[
          { required: true, message: "Please input the duration!" },
          {
            type: "number",
            min: 1,
            max: 10,
            message: "Duration must be between 1 and 10 hours!",
          },
        ]}
      >
        <InputNumber />
      </Form.Item>
      <Form.Item
        label="Location"
        name="location"
        rules={[
          { required: true, message: "Please input the location!" },
          { max: 30, message: "Location must be at most 30 characters long!" },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Association"
        name="association"
        rules={[
          { required: true, message: "Please input the association name!" },
          {
            max: 30,
            message: "Association name must be at most 30 characters long!",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        wrapperCol={{ offset: 6, span: 16 }}
        className="flex justify-end mb-0 px-10 translate-y-4"
      >
        <Button
          size="large"
          className="font-semibold disabled:cursor-not-allowed"
          type="primary"
          htmlType="submit"
        >
          {loading ? <Loading size={25} color="#fff" /> : "Submit"}
        </Button>
      </Form.Item>
    </Form>
  );
}
