import { Button, Row, Checkbox, Col, Form, Input, message } from "antd";
import axios from "axios";
import { useState } from "react";
import Loading from "../Loading";

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
  location: string;
  name: string;
  email: string;
  image: string;
};

interface AddVolunteerFormProps {
  handleOk: () => void;
}

export default function AddVolunteerForm({ handleOk }: AddVolunteerFormProps) {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState<boolean>(false);

  const onFinish = async (formData: FormType) => {
    const volunteerData = { ...formData, ratings: [], reviews: [] };

    try {
      setLoading(true);
      await axios.post("http://localhost:3000/volunteers", volunteerData);
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
        name="type"
        label="Type"
        rules={[
          { required: true, message: "Please input the type of the activity!" },
        ]}
      >
        <Checkbox.Group>
          <Row>
            <Col span={8}>
              <Checkbox value="ecology" style={{ lineHeight: "32px" }}>
                Ecology
              </Checkbox>
            </Col>
            <Col span={8}>
              <Checkbox value="education" style={{ lineHeight: "32px" }}>
                Education
              </Checkbox>
            </Col>
            <Col span={8}>
              <Checkbox value="transport" style={{ lineHeight: "32px" }}>
                Transport
              </Checkbox>
            </Col>
            <Col span={8}>
              <Checkbox value="diverse" style={{ lineHeight: "32px" }}>
                Diverse
              </Checkbox>
            </Col>
          </Row>
        </Checkbox.Group>
      </Form.Item>
      <Form.Item
        wrapperCol={{ offset: 6, span: 16 }}
        className="flex justify-end mb-0 px-10 translate-y-4"
      >
        <Button
          size="large"
          type="primary"
          className="font-semibold disabled:cursor-not-allowed"
          htmlType="submit"
          disabled={loading}
        >
          {loading ? <Loading size={25} color="#fff" /> : "Submit"}
        </Button>
      </Form.Item>
    </Form>
  );
}
