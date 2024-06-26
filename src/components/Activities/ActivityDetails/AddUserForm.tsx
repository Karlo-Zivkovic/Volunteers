import { Button, Form, Input, message } from "antd";
import axios from "axios";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
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
  name: string;
  email: string;
  image: string;
};

interface AddUserFormProps {
  handleOk: () => void;
  id: string;
  volunteers?: { name: string; img: string; email: string }[] | undefined;
}

export default function AddUserForm({
  handleOk,
  id,
  volunteers,
}: AddUserFormProps) {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState<boolean>(false);

  const onFinish = async (formData: FormType) => {
    if (!volunteers) return;
    try {
      setLoading(true);
      const volunteerId = uuidv4();
      const newVolunteer = { ...formData, id: volunteerId };
      await axios.patch(`http://localhost:3000/activities/${id}`, {
        volunteers: [...volunteers, newVolunteer],
      });
      handleOk();
      form.resetFields();
    } catch (error) {
      console.error("Error adding volunteer:", error);
      message.error("Failed to add volunteer to activity!");
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
    >
      <Form.Item
        label="Name"
        name="name"
        rules={[
          { required: true, message: "Please input the name!" },
          { max: 25, message: "Name must be at most 25 characters long!" },
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
        label="Email"
        name="email"
        rules={[
          { required: true, message: "Please input the email address!" },
          { type: "email", message: "Please input a valid email address!" },
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
