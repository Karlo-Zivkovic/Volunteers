import { Button, Form, Input } from "antd";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

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
  city: string;
  name: string;
  email: string;
  image: string;
};

interface AddUserFormProps {
  handleOk: () => void;
  id: string;
  volunteers?:
    | { name: string; img: string; city: string; email: string }[]
    | undefined;
}

export default function AddUserForm({
  handleOk,
  id,
  volunteers,
}: AddUserFormProps) {
  const [form] = Form.useForm();

  const onFinish = async (formData: FormType) => {
    if (!volunteers) return;
    try {
      const volunteerId = uuidv4();
      const newVolunteer = { ...formData, id: volunteerId };
      const response = await axios.patch(
        `http://localhost:3000/activities/${id}`,
        { volunteers: [...volunteers, newVolunteer] },
      );
      if (response.status === 200) {
        form.resetFields();
        handleOk();
      }
    } catch (error) {
      console.error("Error adding volunteer:", error.message);
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
        rules={[{ required: true, message: "Please input the name!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Image Url"
        name="img"
        rules={[{ required: true, message: "Please input the image url!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="City"
        name="city"
        rules={[{ required: true, message: "Please input the city!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Email"
        name="email"
        rules={[{ required: true, message: "Please input the email address!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        wrapperCol={{ offset: 6, span: 16 }}
        className="flex justify-end mb-0 px-10 translate-y-4"
      >
        <Button
          size="large"
          className="font-semibold"
          type="primary"
          htmlType="submit"
        >
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
}
