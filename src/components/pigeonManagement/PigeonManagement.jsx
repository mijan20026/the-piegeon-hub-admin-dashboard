import React, { useState, useMemo } from "react";
import { Button, Table, Input, Select, Row, Col } from "antd";
import PigeonImage from "../../../src/assets/pigeon-image.png";
import VerifyIcon from "../../../src/assets/verify.png";
import GermanyFlag from "../../../src/assets/country-flag.png";

const { Option } = Select;

const initialData = [
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
    color: "Red",
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
    icon: "-",
    color: "Blue",
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
    color: "Green",
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
        src={src || PigeonImage}
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
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    render: (text) => text || "-",
  },
  {
    title: "Verified",
    dataIndex: "verified",
    key: "verified",
    render: (text) => text || "-",
  },
  {
    title: "Iconic",
    dataIndex: "iconic",
    key: "iconic",
    render: (text) => text || "-",
  },
  {
    title: "Iconic Score",
    dataIndex: "iconicScore",
    key: "iconicScore",
    render: (text) => text || "-",
  },
  // {
  //   title: "Country",
  //   dataIndex: "country",
  //   key: "country",
  //   render: (country) =>
  //     country ? (
  //       <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
  //         {country.icon && (
  //           <img
  //             src={country.icon}
  //             alt={country.name}
  //             style={{ width: 20, height: 20, borderRadius: "50%" }}
  //           />
  //         )}
  //         <span>{country.name || "-"}</span>
  //       </div>
  //     ) : (
  //       "-"
  //     ),
  // },
  {
    title: "Country",
    dataIndex: "country",
    key: "country",
    render: (country) => (country ? <span>{country.name || "-"}</span> : "-"),
  },
  {
    title: "Pigeon ID",
    dataIndex: "pigeonId",
    key: "pigeonId",
    render: (text) => text || "-",
  },
  {
    title: "Ring Number",
    dataIndex: "ringNumber",
    key: "ringNumber",
    render: (text) => text || "-",
  },
  {
    title: "Birth Year",
    dataIndex: "birthYear",
    key: "birthYear",
    render: (text) => text || "-",
  },
  {
    title: "Father",
    dataIndex: "father",
    key: "father",
    render: (text) => text || "-",
  },
  {
    title: "Mother",
    dataIndex: "mother",
    key: "mother",
    render: (text) => text || "-",
  },
  {
    title: "Gender",
    dataIndex: "gender",
    key: "gender",
    render: (text) => text || "-",
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    render: (text) => text || "-",
  },
  {
    title: "Color",
    dataIndex: "color",
    key: "color",
    render: (text) => text || "-",
  },
  {
    title: "Icon",
    dataIndex: "icon",
    key: "icon",
    width: 80,
    render: (src) =>
      src && src !== "-" ? (
        <img
          src={src}
          alt="verify"
          style={{ width: 24, height: 24, objectFit: "cover" }}
        />
      ) : (
        "-"
      ),
  },
];

const PigeonManagement = () => {
  const [data, setData] = useState(initialData);
  const [search, setSearch] = useState("");
  const [filterCountry, setFilterCountry] = useState("all");
  const [filterGender, setFilterGender] = useState("all");
  const [filterColor, setFilterColor] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");

  const filteredData = useMemo(() => {
    return data.filter((item) => {
      const matchesSearch =
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.ringNumber.toLowerCase().includes(search.toLowerCase());

      const matchesCountry =
        filterCountry === "all" ||
        item.country.name.toLowerCase() === filterCountry;
      const matchesGender =
        filterGender === "all" || item.gender.toLowerCase() === filterGender;
      const matchesColor =
        filterColor === "all" || item.color.toLowerCase() === filterColor;
      const matchesStatus =
        filterStatus === "all" ||
        (filterStatus === "verified"
          ? item.verified === "Yes"
          : item.verified === "No");

      return (
        matchesSearch &&
        matchesCountry &&
        matchesGender &&
        matchesColor &&
        matchesStatus
      );
    });
  }, [data, search, filterCountry, filterGender, filterColor, filterStatus]);

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
          <Col xs={24} sm={12} md={6} lg={5}>
            <div className="flex flex-col">
              <label className="mb-1 text-gray-300">Search</label>
              <Input
                placeholder="Search..."
                className="custom-input-ant"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </Col>
          <Col xs={24} sm={12} md={6} lg={4}>
            <div className="flex flex-col">
              <label className="mb-1 text-gray-300">Country</label>
              <Select
                placeholder="Select Country"
                className="custom-select-ant"
                style={{ width: "100%" }}
                value={filterCountry}
                onChange={(val) => setFilterCountry(val)}
              >
                <Option value="all">All</Option>
                <Option value="usa">USA</Option>
                <Option value="uk">UK</Option>
                <Option value="canada">Canada</Option>
                <Option value="germany">Germany</Option>
              </Select>
            </div>
          </Col>
          <Col xs={24} sm={12} md={6} lg={4}>
            <div className="flex flex-col">
              <label className="mb-1 text-gray-300">Gender</label>
              <Select
                placeholder="Select Gender"
                className="custom-select-ant"
                style={{ width: "100%" }}
                value={filterGender}
                onChange={(val) => setFilterGender(val)}
              >
                <Option value="all">All</Option>
                <Option value="male">Male</Option>
                <Option value="female">Female</Option>
              </Select>
            </div>
          </Col>
          <Col xs={24} sm={12} md={6} lg={4}>
            <div className="flex flex-col">
              <label className="mb-1 text-gray-300">Color</label>
              <Select
                placeholder="Select Color"
                className="custom-select-ant"
                style={{ width: "100%" }}
                value={filterColor}
                onChange={(val) => setFilterColor(val)}
              >
                <Option value="all">All</Option>
                <Option value="red">Red</Option>
                <Option value="blue">Blue</Option>
                <Option value="green">Green</Option>
                <Option value="yellow">Yellow</Option>
              </Select>
            </div>
          </Col>
          <Col xs={24} sm={12} md={6} lg={4}>
            <div className="flex flex-col">
              <label className="mb-1 text-gray-300">Status</label>
              <Select
                placeholder="Select Status"
                className="custom-select-ant"
                style={{ width: "100%" }}
                value={filterStatus}
                onChange={(val) => setFilterStatus(val)}
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
              columns={getColumns()}
              dataSource={filteredData}
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
