import React, { useState } from "react";
import { Button, Table, Input, Select, Row, Col, Tabs } from "antd";
import PigeonImage from "../../../src/assets/pigeon-image.png";
import VerifyIcon from "../../../src/assets/verify.png";
// import AddNewPigeon from "./AddNewPigeon"; // import modal
import GermanyFlag from "../../../src/assets/country-flag.png";

const { Option } = Select;
const { TabPane } = Tabs;

const dataSource = [
  {
    key: "1",
    image: PigeonImage,
    name: "Pigeon 1",
    verified: "Yes",
    iconic: "Champion",
    iconicScore: 95,
    country: { name: "USA", icon: GermanyFlag },
    pigeonId: "P1001",
    ringNumber: "R1234",
    birthYear: 2020,
    father: "Father A",
    mother: "Mother A",
    gender: "Male",
    status: "Active",
    icon: VerifyIcon,
  },
  {
    key: "2",
    image: PigeonImage,
    name: "Pigeon 2",
    verified: "No",
    iconic: "Elite",
    iconicScore: 88,
    country: { name: "UK", icon: GermanyFlag },
    pigeonId: "P1002",
    ringNumber: "R1235",
    birthYear: 2021,
    father: "Father B",
    mother: "Mother B",
    gender: "Female",
    status: "Inactive",
    icon: VerifyIcon,
  },
  {
    key: "3",
    image: PigeonImage,
    name: "Pigeon 3",
    verified: "Yes",
    iconic: "Grandmaster",
    iconicScore: 99,
    country: { name: "Canada", icon: GermanyFlag },
    pigeonId: "P1003",
    ringNumber: "R1236",
    birthYear: 2019,
    father: "Father C",
    mother: "Mother C",
    gender: "Male",
    status: "Active",
    icon: VerifyIcon,
  },
];

const getColumns = () => [
  {
    title: "Image",
    dataIndex: "image",
    key: "image",
    width: 100,
    render: (src) => (
      <img
        src={src}
        alt="pigeon"
        style={{
          width: 50,
          height: 50,
          borderRadius: "50%",
          objectFit: "cover",
        }}
      />
    ),
  },
  { title: "Name", dataIndex: "name", key: "name" },
  { title: "Verified", dataIndex: "verified", key: "verified" },
  { title: "Iconic", dataIndex: "iconic", key: "iconic" },
  { title: "Iconic Score", dataIndex: "iconicScore", key: "iconicScore" },
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
  { title: "Pigeon ID", dataIndex: "pigeonId", key: "pigeonId" },
  { title: "Ring Number", dataIndex: "ringNumber", key: "ringNumber" },
  { title: "Birth Year", dataIndex: "birthYear", key: "birthYear" },
  { title: "Father", dataIndex: "father", key: "father" },
  { title: "Mother", dataIndex: "mother", key: "mother" },
  { title: "Gender", dataIndex: "gender", key: "gender" },
  { title: "Status", dataIndex: "status", key: "status" },
  {
    title: "Icon",
    dataIndex: "icon",
    key: "icon",
    width: 80,
    render: (src) => (
      <img
        src={src}
        alt="verify"
        style={{ width: 24, height: 24, objectFit: "cover" }}
      />
    ),
  },
];

const PigeonManagement = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const columns = getColumns();

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log("Selected row keys:", selectedRowKeys, selectedRows);
    },
  };

  return (
    <div className="w-full">
      {/* Tabs and Filters */}
      <div className="bg-[#333D49] rounded-lg shadow-lg border border-gray-200 mb-2 mt-6">
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

          {/* Color Dropdown */}
          <Col xs={24} sm={12} md={6} lg={4}>
            <div className="flex flex-col">
              <label className="mb-1 text-gray-300">Color</label>
              <Select
                placeholder="Select Color"
                className="custom-select-ant"
                style={{ width: "100%" }}
              >
                <Option value="all">All</Option>
                <Option value="red">Red</Option>
                <Option value="blue">Blue</Option>
                <Option value="green">Green</Option>
                <Option value="yellow">Yellow</Option>
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
                <Option value="verified">Verified</Option>
                <Option value="notverified">Not Verified</Option>
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
              rowSelection={rowSelection}
              columns={columns}
              dataSource={dataSource}
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
    </div>
  );
};

export default PigeonManagement;
