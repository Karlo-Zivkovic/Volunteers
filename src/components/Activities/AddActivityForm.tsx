import { Button, DatePicker, Form, Input, InputNumber, TimePicker } from "antd";
import axios from "axios";
import moment from "moment";

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
  date: string;
  start_time: string;
  duration: string;
  location: string;
  association: string;
  coordinates: { latitude: string; longitude: string };
  volunteers: { name: string; email: string; img: string }[];
};

interface AddActivityFormProps {
  handleOk: () => void;
}

export default function AddActivityForm({ handleOk }: AddActivityFormProps) {
  const [form] = Form.useForm();
  const onFinish = async (formData: FormType) => {
    const formValues = {
      ...formData,
      date: moment(formData["date"]).format("DD MMM YYYY"),
      start_time: moment(formData["start_time"]).format("h:mm A"),
      volunteers: [],
    };
    try {
      const response = await axios.post(
        `http://localhost:3000/activities`,
        formValues,
      );
      if (response.status === 201) {
        handleOk();
        form.resetFields();
      }
    } catch (error) {
      console.error("Error adding volunteer:", error.message);
    }

    console.log(formValues);
  };

  return (
    <Form
      form={form}
      {...formItemLayout}
      variant="filled"
      style={{ maxWidth: 1200 }}
      onFinish={onFinish}
      className="py-4"
    >
      <Form.Item
        label="Title"
        name="title"
        rules={[{ required: true, message: "Please input the title!" }]}
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
        label="Description"
        name="description"
        rules={[{ required: true, message: "Please input the description!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Content"
        name="content"
        rules={[{ required: true, message: "Please input the content!" }]}
      >
        <Input.TextArea />
      </Form.Item>
      <Form.Item
        label="Date"
        name="date"
        rules={[{ required: true, message: "Please input the date!" }]}
      >
        <DatePicker format={"DD MMM YYYY"} />
      </Form.Item>
      <Form.Item
        label="Time"
        name="start_time"
        rules={[{ required: true, message: "Please input the start time!" }]}
      >
        <TimePicker format={"h:mm A"} />
      </Form.Item>
      <Form.Item
        label="Duration"
        name="duration"
        rules={[{ required: true, message: "Please input the duration!" }]}
      >
        <InputNumber />
      </Form.Item>
      <Form.Item
        label="Location"
        name="location"
        rules={[{ required: true, message: "Please input the location!" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Association"
        name="association"
        rules={[
          { required: true, message: "Please input the association name!" },
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
