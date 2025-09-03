// src/pages/MyPigeon.jsx
import React, { useMemo, useState } from "react";
import { Button, Table, Input, Select, Row, Col, Tabs, Spin } from "antd";
import AddNewPigeon from "./AddNewPigeon";
import { useGetMyPigeonsQuery } from "../../redux/apiSlices/mypigeonSlice";

const { Option } = Select;
const { TabPane } = Tabs;

const getColumns = () => [
  {
    title: "Image",
    dataIndex: "image",
    key: "image",
    width: 100,
    render: (src) =>
      src ? (
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
      ) : (
        <span>-</span>
      ),
  },
  { title: "Name", dataIndex: "name", key: "name" },
  {
    title: "Country",
    dataIndex: "country",
    key: "country",
    render: (country) => {
      if (!country) return <span>-</span>;
      return <span>{country.name}</span>;
    },
  },
  { title: "Breeder", dataIndex: "breeder", key: "breeder" },
  { title: "Ring Number", dataIndex: "ringNumber", key: "ringNumber" },
  { title: "Birth Year", dataIndex: "birthYear", key: "birthYear" },
  { title: "Father", dataIndex: "father", key: "father" },
  { title: "Mother", dataIndex: "mother", key: "mother" },
  { title: "Gender", dataIndex: "gender", key: "gender" },
  { title: "Color", dataIndex: "color", key: "color" },
  { title: "Status", dataIndex: "status", key: "status" },
  { title: "Verified", dataIndex: "verified", key: "verified" },
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
        <span>-</span>
      ),
  },
];

const MyPigeon = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [filters, setFilters] = useState({
    search: "",
    country: "all",
    gender: "all",
    color: "all",
    status: "all",
  });

  // pagination state (client-side, after filtering)
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // fetch ALL pigeons (big limit) so filtering applies across entire dataset
  const { data, isLoading } = useGetMyPigeonsQuery({ page: 1, limit: 1000 });
  const pigeons = data?.pigeons || [];

  const columns = getColumns();

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setPage(1); // reset to first page when filters change
  };

  // filter across the full dataset
  const filteredData = useMemo(() => {
    return pigeons.filter((item) => {
      const search = filters.search.trim().toLowerCase();

      const matchesSearch =
        search === "" ||
        item.name?.toLowerCase().includes(search) ||
        item.breeder?.toLowerCase().includes(search) ||
        item.ringNumber?.toLowerCase().includes(search);

      const matchesCountry =
        filters.country === "all" ||
        item.country?.name?.toLowerCase() === filters.country;

      const matchesGender =
        filters.gender === "all" ||
        item.gender?.toLowerCase() === filters.gender;

      const matchesColor =
        filters.color === "all" || item.color?.toLowerCase() === filters.color;

      const matchesStatus =
        filters.status === "all" ||
        (filters.status === "verified" && item.verified === "Yes") ||
        (filters.status === "notverified" && item.verified === "No");

      return (
        matchesSearch &&
        matchesCountry &&
        matchesGender &&
        matchesColor &&
        matchesStatus
      );
    });
  }, [pigeons, filters]);

  // paginate AFTER filtering (10 items per page by default)
  const paginatedData = useMemo(() => {
    const start = (page - 1) * pageSize;
    const end = page * pageSize;
    return filteredData.slice(start, end);
  }, [filteredData, page, pageSize]);

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log("Selected row keys:", selectedRowKeys, selectedRows);
    },
  };

  return (
    <div className="w-full">
      <div className="flex justify-end mb-4 mt-4">
        <Button
          type="primary"
          className="py-5 px-7 font-semibold text-[16px]"
          onClick={() => setIsModalVisible(true)}
        >
          Add New Pigeon
        </Button>
      </div>

      {/* Tabs and Filters */}
      <div className="bg-[#333D49] rounded-lg shadow-lg border border-gray-200 mb-2">
        <div className="pt-3 mb-6 px-4 rounded-t-lg bg-[#44505E]">
          <Tabs defaultActiveKey="all" tabBarGutter={50} className="custom-tabs">
            <TabPane tab="All" key="all" />
            <TabPane tab="Racing" key="racing" />
            <TabPane tab="Breeding" key="breeding" />
            <TabPane tab="Lost" key="lost" />
            <TabPane tab="Sold" key="sold" />
            <TabPane tab="Retired" key="retired" />
            <TabPane tab="Deceased" key="deceased" />
          </Tabs>
        </div>

        <Row gutter={[16, 16]} className="flex flex-wrap px-4 mb-4">
          {/* Search Bar */}
          <Col xs={24} sm={12} md={6} lg={5}>
            <div className="flex flex-col">
              <label className="mb-1 text-gray-300">Search</label>
              <Input
                placeholder="Search..."
                className="custom-input-ant"
                value={filters.search}
                onChange={(e) => handleFilterChange("search", e.target.value)}
              />
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
                value={filters.country}
                onChange={(value) => handleFilterChange("country", value)}
              >
                <Option value="all">All</Option>
                <Option value="bangladesh">Bangladesh</Option>
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
                value={filters.gender}
                onChange={(value) => handleFilterChange("gender", value)}
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
                value={filters.color}
                onChange={(value) => handleFilterChange("color", value)}
              >
                <Option value="all">All</Option>
                <Option value="white">White</Option>
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
                value={filters.status}
                onChange={(value) => handleFilterChange("status", value)}
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
          <div
            style={{
              minWidth: filteredData.length > 0 ? "max-content" : "100%",
            }}
          >
            {isLoading ? (
              <div className="flex justify-center items-center p-6">
                <Spin size="large" />
              </div>
            ) : (
              <Table
                rowSelection={rowSelection}
                columns={columns}
                dataSource={paginatedData}
                rowClassName={() => "hover-row"}
                bordered={false}
                size="small"
                rowKey="key"
                scroll={filteredData.length > 0 ? { x: "max-content" } : undefined}
                pagination={{
                  current: page,
                  pageSize: pageSize,
                  total: filteredData.length, // total after filtering
                  showSizeChanger: true,
                  pageSizeOptions: ["5", "10", "20", "50"],
                  onChange: (newPage, newPageSize) => {
                    setPage(newPage);
                    setPageSize(newPageSize);
                  },
                }}
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
                locale={{
                  emptyText: (
                    <div className="py-10 text-gray-400 text-center">
                      No pigeons found 🕊️
                    </div>
                  ),
                }}
              />
            )}
          </div>
        </div>
      </div>

      {/* AddNewPigeon Modal */}
      <AddNewPigeon
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        onSave={() => {
          // In real use, POST to API then refetch via RTK Query
          setIsModalVisible(false);
        }}
      />
    </div>
  );
};

export default MyPigeon;
