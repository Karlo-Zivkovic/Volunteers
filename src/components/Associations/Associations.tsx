import { useEffect, useState } from "react";
import { Space, Table } from "antd";
import type { TableProps } from "antd";
import { Association } from "../types";
import axios from "axios";

const columns: TableProps<Association>["columns"] = [
  {
    title: <p className="text-xl text-slate-700">Name</p>,
    dataIndex: "name",
    key: "name",
    render: (text) => <p className="py-6 text-2xl text-slate-700">{text}</p>,
  },
  {
    title: <p className="text-xl text-slate-700">Location</p>,
    dataIndex: "location",
    key: "location",
    render: (text) => <p className="py-6 text-xl text-slate-700">{text}</p>,
  },
  {
    title: <p className="text-xl text-slate-700">Address</p>,
    dataIndex: "address",
    key: "address",
    render: (text) => (
      <p className="py-6 text-lg italic text-slate-700">{text}</p>
    ),
  },
  {
    title: <p className="text-xl text-slate-700">Action</p>,
    key: "action",
    render: (_, record) => (
      <Space size="middle">
        <a>Invite {record.name}</a>
        <a>Delete</a>
      </Space>
    ),
  },
];

export default function Associations() {
  const [associations, setAssociations] = useState<Association[] | undefined>(
    undefined,
  );
  useEffect(() => {
    const fetchAssociations = async () => {
      const { data } = await axios("http://localhost:3000/associations");
      setAssociations(data);
    };
    fetchAssociations();
  }, []);

  return (
    <Table
      pagination={{
        pageSize: 4,
        responsive: true,
      }}
      columns={columns}
      dataSource={associations}
      className="w-[80rem] mx-auto h-full py-40"
      rowClassName={function (record, index) {
        return;
      }}
    />
  );
}
