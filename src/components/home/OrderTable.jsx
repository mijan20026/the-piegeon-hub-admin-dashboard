import React from "react";
import { Table } from "antd";
import PigeonImage from "../../../src/assets/pigeon-image.png";
import VerifyIcon from "../../../src/assets/verify.png";

// ✅ Add country icons (replace with your own icons if available)
import GermanyFlag from "../../../src/assets/country-flag.png";

// Sample data for pigeons
const dataSource = [
  {
    key: "1",
    image: PigeonImage,
    name: "Pigeon 1",
    country: { name: "USA", icon: GermanyFlag }, // ✅ object with name & icon
    breeder: "Breeder A",
    ringNumber: "R1234",
    birthYear: 2020,
    father: "Father A",
    mother: "Mother A",
    gender: "Male",
    status: "Active",
    verified: "Yes",
    icon: VerifyIcon,
  },
  {
    key: "2",
    image: PigeonImage,
    name: "Pigeon 2",
    country: { name: "UK", icon: GermanyFlag },
    breeder: "Breeder B",
    ringNumber: "R1235",
    birthYear: 2021,
    father: "Father B",
    mother: "Mother B",
    gender: "Female",
    status: "Inactive",
    verified: "No",
    icon: VerifyIcon,
  },
  {
    key: "3",
    image: PigeonImage,
    name: "Pigeon 3",
    country: { name: "Canada", icon: GermanyFlag },
    breeder: "Breeder C",
    ringNumber: "R1236",
    birthYear: 2019,
    father: "Father C",
    mother: "Mother C",
    gender: "Male",
    status: "Active",
    verified: "Yes",
    icon: VerifyIcon,
  },
];

// Column definitions
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
  { title: "Breeder", dataIndex: "breeder", key: "breeder" },
  { title: "Ring Number", dataIndex: "ringNumber", key: "ringNumber" },
  { title: "Birth Year", dataIndex: "birthYear", key: "birthYear" },
  { title: "Father", dataIndex: "father", key: "father" },
  { title: "Mother", dataIndex: "mother", key: "mother" },
  { title: "Gender", dataIndex: "gender", key: "gender" },
  { title: "Status", dataIndex: "status", key: "status" },
  { title: "Verified", dataIndex: "verified", key: "verified" },
  {
    title: "Icon",
    dataIndex: "icon",
    key: "icon",
    width: 80,
    render: (src) => (
      <img
        src={src}
        alt="verify"
        style={{
          width: 24,
          height: 24,
          objectFit: "cover",
        }}
      />
    ),
  },
];

const PigeonTable = () => {
  const columns = getColumns();

  // Row selection config
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log("Selected row keys:", selectedRowKeys, selectedRows);
    },
  };

  return (
    <div className="w-full">
      <div className="flex flex-col sm:flex-row justify-between mb-2 items-start sm:items-center gap-2 sm:gap-0">
        <h1 className="text-lg sm:text-xl md:text-xl font-bold text-secondary mb-2">
          Recently Added Pigeons
        </h1>
      </div>
      <div className="overflow-x-auto border rounded-lg shadow-md bg-gray-50 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
        <div className="border rounded-lg shadow-md bg-gray-50">
          <div style={{ minWidth: "max-content" }}>
            <Table
              rowSelection={rowSelection}
              columns={columns}
              dataSource={dataSource}
              rowClassName={() => "hover-row"} // ✅ add hover class
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

export default PigeonTable;
