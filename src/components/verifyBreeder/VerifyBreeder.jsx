import React, { useState } from "react";
import { Button, Table, Input, Select, Row, Col, Modal, Form } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import AddVerifiedBadge from "./AddVerifiedBadge"; // Add Modal
import GermanyFlag from "../../../src/assets/country-flag.png";

const { Option } = Select;

const initialData = [
  {
    key: "1",
    breederName: "Breeder A",
    pigeonScore: 95,
    country: { name: "USA", icon: GermanyFlag },
    email: "breederA@example.com",
    phoneNumber: "+1 123-456-7890",
    gender: "Male",
    experienceLevel: "Expert",
    status: "Active",
  },
  {
    key: "2",
    breederName: "Breeder B",
    pigeonScore: 88,
    country: { name: "UK", icon: GermanyFlag },
    email: "breederB@example.com",
    phoneNumber: "+44 789-456-1230",
    gender: "Female",
    experienceLevel: "Intermediate",
    status: "Inactive",
  },
  {
    key: "3",
    breederName: "Breeder C",
    pigeonScore: 99,
    country: { name: "Canada", icon: GermanyFlag },
    email: "breederC@example.com",
    phoneNumber: "+1 555-987-6543",
    gender: "Male",
    experienceLevel: "Beginner",
    status: "Active",
  },
];

const getColumns = (onEdit, onDelete) => [
  { title: "Breeder Name", dataIndex: "breederName", key: "breederName" },
  { title: "Pigeon Score", dataIndex: "pigeonScore", key: "pigeonScore" },
  {
    title: "Country",
    dataIndex: "country",
    key: "country",
    render: (country) => (
      <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
        <img
          src={country.icon}
          alt={country.name}
          style={{ width: 20, height: 20, borderRadius: "50%" }}
        />
        <span>{country.name}</span>
      </div>
    ),
  },
  { title: "E-mail", dataIndex: "email", key: "email" },
  { title: "Phone Number", dataIndex: "phoneNumber", key: "phoneNumber" },
  { title: "Gender", dataIndex: "gender", key: "gender" },
  {
    title: "Experience Level",
    dataIndex: "experienceLevel",
    key: "experienceLevel",
  },
  { title: "Status", dataIndex: "status", key: "status" },
  {
    title: "Actions",
    key: "actions",
    width: 120,
    render: (_, record) => (
      <div style={{ display: "flex", gap: "12px" }}>
        <EditOutlined
          style={{ color: "#1890ff", fontSize: "18px", cursor: "pointer" }}
          onClick={() => onEdit(record)}
        />
        <DeleteOutlined
          style={{ color: "#ff4d4f", fontSize: "18px", cursor: "pointer" }}
          onClick={() => onDelete(record)}
        />
      </div>
    ),
  },
];

const VerifyBreeder = () => {
  const [data, setData] = useState(initialData);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [editingData, setEditingData] = useState(null);

  const handleEdit = (record) => {
    setEditingData(record);
    setIsEditModalVisible(true);
  };

  const handleDelete = (record) => {
    console.log("Delete row:", record);
    setData((prev) => prev.filter((item) => item.key !== record.key));
  };

  const handleEditSave = (values) => {
    setData((prev) =>
      prev.map((item) =>
        item.key === editingData.key ? { ...editingData, ...values } : item
      )
    );
    setIsEditModalVisible(false);
  };

  const columns = getColumns(handleEdit, handleDelete);

  return (
    <div className="w-full">
      <div className="flex justify-end mb-4 mt-4">
        <Button
          type="primary"
          className="py-5 px-8"
          onClick={() => setIsAddModalVisible(true)}
        >
          Add Verified Breeder
        </Button>
      </div>

      {/* Tabs and Filters */}
      <div className="bg-[#333D49] rounded-lg shadow-lg border border-gray-200 mb-2">
        <Row gutter={[16, 16]} className="flex flex-wrap px-4 mb-4 mt-4">
          {/* Search Bar */}
          <Col xs={24} sm={12} md={6} lg={5}>
            <div className="flex flex-col">
              <label className="mb-1 text-gray-300">Search</label>
              <Input placeholder="Search..." className="custom-input-ant" />
            </div>
          </Col>

          {/* Country Dropdown */}
          <Col xs={24} sm={12} md={6} lg={4}>
            <div className="flex flex-col">
              <label className="mb-1 text-gray-300">Country</label>
              <Select
                placeholder="Select Country"
                className="custom-select-ant"
                style={{ width: "100%" }}
              >
                <Option value="all">All</Option>
                <Option value="usa">USA</Option>
                <Option value="uk">UK</Option>
                <Option value="canada">Canada</Option>
                <Option value="germany">Germany</Option>
              </Select>
            </div>
          </Col>

          {/* Gender Dropdown */}
          <Col xs={24} sm={12} md={6} lg={4}>
            <div className="flex flex-col">
              <label className="mb-1 text-gray-300">Gender</label>
              <Select
                placeholder="Select Gender"
                className="custom-select-ant"
                style={{ width: "100%" }}
              >
                <Option value="all">All</Option>
                <Option value="male">Male</Option>
                <Option value="female">Female</Option>
              </Select>
            </div>
          </Col>

          {/* Experience Level Dropdown */}
          <Col xs={24} sm={12} md={6} lg={4}>
            <div className="flex flex-col">
              <label className="mb-1 text-gray-300">Experience Level</label>
              <Select
                placeholder="Select Level"
                className="custom-select-ant"
                style={{ width: "100%" }}
              >
                <Option value="all">All</Option>
                <Option value="beginner">Beginner</Option>
                <Option value="intermediate">Intermediate</Option>
                <Option value="expert">Expert</Option>
              </Select>
            </div>
          </Col>

          {/* Status Dropdown */}
          <Col xs={24} sm={12} md={6} lg={4}>
            <div className="flex flex-col">
              <label className="mb-1 text-gray-300">Status</label>
              <Select
                placeholder="Select Status"
                className="custom-select-ant"
                style={{ width: "100%" }}
              >
                <Option value="all">All</Option>
                <Option value="active">Active</Option>
                <Option value="inactive">Inactive</Option>
              </Select>
            </div>
          </Col>
        </Row>
      </div>

      {/* Table */}
      <div className="overflow-x-auto border rounded-lg shadow-md bg-gray-50 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
        <div className="border rounded-lg shadow-md bg-gray-50">
          <div style={{ minWidth: "max-content" }}>
            <Table
              columns={columns}
              dataSource={data}
              rowClassName={() => "hover-row"}
              components={{
                header: {
                  cell: (props) => (
                    <th
                      {...props}
                      style={{
                        height: 70,
                        lineHeight: "70px",
                        background: "#333D49",
                        color: "#ffffff",
                        fontWeight: 600,
                        padding: "0 16px",
                      }}
                    >
                      {props.children}
                    </th>
                  ),
                },
                body: {
                  cell: (props) => (
                    <td
                      {...props}
                      style={{
                        background: "#212B35",
                        padding: "12px 16px",
                        color: "#ffffff",
                        borderBottom: "none",
                      }}
                    >
                      {props.children}
                    </td>
                  ),
                },
              }}
              bordered={false}
              pagination={false}
              size="small"
              scroll={{ x: "max-content" }}
              rowKey="key"
            />
          </div>
        </div>
      </div>

      {/* Add Modal */}
      <AddVerifiedBadge
        visible={isAddModalVisible}
        onCancel={() => setIsAddModalVisible(false)}
        onSave={(newData) => {
          setData((prev) => [
            ...prev,
            { key: String(prev.length + 1), ...newData },
          ]);
          setIsAddModalVisible(false);
        }}
      />

      {/* Edit Modal */}
      <Modal
        title="Edit Verified Breeder"
        visible={isEditModalVisible}
        onCancel={() => setIsEditModalVisible(false)}
        footer={null}
      >
        {editingData && (
          <Form
            layout="vertical"
            initialValues={editingData}
            onFinish={handleEditSave}
          >
            <Form.Item name="breederName" label="Breeder Name">
              <Input />
            </Form.Item>
            <Form.Item name="pigeonScore" label="Pigeon Score">
              <Input type="number" />
            </Form.Item>
            <Form.Item name="email" label="E-mail">
              <Input />
            </Form.Item>
            <Form.Item name="phoneNumber" label="Phone Number">
              <Input />
            </Form.Item>
            <Form.Item name="gender" label="Gender">
              <Select>
                <Option value="Male">Male</Option>
                <Option value="Female">Female</Option>
              </Select>
            </Form.Item>
            <Form.Item name="experienceLevel" label="Experience Level">
              <Select>
                <Option value="Beginner">Beginner</Option>
                <Option value="Intermediate">Intermediate</Option>
                <Option value="Expert">Expert</Option>
              </Select>
            </Form.Item>
            <Form.Item name="status" label="Status">
              <Select>
                <Option value="Active">Active</Option>
                <Option value="Inactive">Inactive</Option>
              </Select>
            </Form.Item>
            <div className="flex justify-end">
              <Button
                onClick={() => setIsEditModalVisible(false)}
                style={{ marginRight: 8 }}
              >
                Cancel
              </Button>
              <Button type="primary" htmlType="submit">
                Save
              </Button>
            </div>
          </Form>
        )}
      </Modal>
    </div>
  );
};

export default VerifyBreeder;
