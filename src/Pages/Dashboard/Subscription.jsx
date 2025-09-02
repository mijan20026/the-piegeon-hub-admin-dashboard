import React, { useState, useEffect } from "react";
import { Card, Button, Modal, Form, Input, List, message, Select, Row, Col } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
  CheckCircleFilled,
} from "@ant-design/icons";
import Swal from "sweetalert2";
import FeaturedInput from "../../components/common/PackageFeatureInput";
import GradientButton from "../../components/common/GradiantButton";
import SubscriptionHeadingIcon from "../../assets/subscription-heading.png";

const PackagesPlans = () => {
  // Default packages data
  const defaultPackages = [
    {
      id: 1,
      title: "Freebie",
      description:
        "Ideal for individuals who who need advanced features and tools for client work.",
      price: 0,
      duration: "1 month",
      features: [
        "100+ of PNG & SVG Uploaded Pictures",
        "Access to 4 Generation Details",
        "Upload custom icons and fonts",
        "Unlimited Sharing",
        "Upload graphics & video in up to 4k",
        "Unlimited Projects",
        "Instant Access to our design system",
        "Create teams to collaborate on designs",
      ],
      popular: false,
      active: true,
    },
    {
      id: 2,
      title: "Professional",
      description:
        "Ideal for individuals who who need advanced features and tools for client work.",
      price: 20,
      duration: "6 months",
      features: [
        "Unlimited Uploaded Pictures",
        "Unlimited Access to 100 million stock images",
        "Upload custom icons and fonts",
        "Unlimited Sharing",
        "Upload graphics & video in up to 4k",
        "Unlimited Projects",
        "Instant Access to our design system",
        "Create teams to collaborate on designs",
      ],
      popular: true,
      active: false,
    },
    // {
    //   id: 3,
    //   title: "Premium Plan",
    //   description: "Billed annually.",
    //   price: 40,
    //   duration: "1 year",
    //   features: [
    //     "Unlimited User Accounts",
    //     "Enterprise Analytics",
    //     "Dedicated Account Manager",
    //     "Unlimited Storage",
    //     "Complete System Integration",
    //   ],
    //   popular: false,
    //   active: true,
    // },
  ];

  // Local state for packages
  const [packages, setPackages] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentPackage, setCurrentPackage] = useState(null);
  const [form] = Form.useForm();

  // Load default packages on component mount
  useEffect(() => {
    setPackages(defaultPackages);
  }, []);

  // Turn off/on package
  const togglePackageStatus = (id) => {
    setPackages((prev) =>
      prev.map((pkg) => (pkg.id === id ? { ...pkg, active: !pkg.active } : pkg))
    );
    message.success("Package status updated");
  };

  // Show modal for adding or editing package
  const showModal = (pkg = null) => {
    setIsEditing(!!pkg);
    setCurrentPackage(pkg);
    setIsModalOpen(true);

    if (pkg) {
      form.setFieldsValue({
        title: pkg.title,
        description: pkg.description,
        price: Number(pkg.price),
        duration: pkg.duration,
        features: pkg.features || [],
        popular: pkg.popular || false,
      });
    } else {
      form.resetFields();
    }
  };

  // Close the modal
  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
  };

  // Handle delete confirmation
  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this package!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#023F86",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        setPackages(packages.filter((pkg) => pkg.id !== id));
        Swal.fire({
          title: "Deleted!",
          text: "The package has been deleted.",
          icon: "success",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };

  // Handle form submission (Add/Update package)
  const handleSubmit = (values) => {
    const formattedData = {
      id: isEditing ? currentPackage.id : Date.now(), // Use timestamp for new package ID
      title: values.title,
      description: values.description,
      price: Number(values.price),
      duration: values.duration,
      features: values.features.filter((f) => f.trim() !== ""),
      popular: values.popular || false,
    };

    if (isEditing) {
      // Update package
      setPackages(
        packages.map((pkg) =>
          pkg.id === currentPackage.id ? formattedData : pkg
        )
      );
      message.success("Package updated successfully");
    } else {
      // Add new package
      setPackages([...packages, formattedData]);
      message.success("Package added successfully");
    }

    setIsModalOpen(false);
    form.resetFields();
  };

  // Get card background color based on package popularity
  // Example: Different styles for different packages
  const getCardStyle = (pkg) => {
    if (pkg.popular) {
      // Popular package style
      return "shadow-lg rounded-lg bg-[#071952] hover:shadow-xl transition-all transform hover:-translate-y-1";
    }

    if (pkg.title === "Freebie") {
      return "shadow-sm rounded-lg border border-gray-300 bg-[#F9FAFB] hover:shadow-md transition-all transform hover:-translate-y-1";
    }

    if (pkg.title === "Professional") {
      return "shadow-md rounded-lg border border-gray-400 bg-[#E6F7FF] hover:shadow-lg transition-all transform hover:-translate-y-1";
    }

    // Default style
    return "shadow-sm rounded-lg border border-gray-200 bg-[#F2F2F2] hover:shadow-md transition-all transform hover:-translate-y-1";
  };

  const getTitleStyle = (pkg) => {
    if (pkg.popular) {
      return "text-white text-[22px] font-semibold"; // popular package title
    }
    // Default style
    return "text-[#071952] text-[22px] font-semibold";
  };

  const getPriceStyle = (pkg) => {
    if (pkg.popular) {
      return "text-white text-[56px] font-semibold"; // popular package title
    }
    // Default style
    return "text-[#071952] text-[56px] font-semibold";
  };

  const getDurationStyle = (pkg) => {
    if (pkg.popular) {
      return "text-white text-[16px] font-regular"; // popular package title
    }
    // Default style
    return "text-[#071952] text-[16px] font-regular";
  };

  const getDescriptionStyle = (pkg) => {
    if (pkg.popular) {
      return "text-white text-[16px] font-thin"; // popular package title
    }
    // Default style
    return "text-[#071952] text-[16px] font-thin";
  };

  const getFeatureStyle = (pkg) => {
    if (pkg.popular) {
      return "text-white text-[16px] font-thin"; // popular package title
    }
    // Default style
    return "text-[#071952] text-[16px] font-thin";
  };

  return (
    <div className="flex !justify-center !items-center mt-10">
      <div className="max-w-[1000px]">
        {/* <div className="flex flex-col justify-center items-center mb-8">
        <p className="bg-primary px-[12px] py-[4px] text-white rounded-3xl mb-2">
          Pricing Plan
        </p>
        <h2 className="text-[38px] font-semibold text-secondary">
          Plans for all sizes
        </h2>
        <p className="text-[15px] font-normal mb-[10px]">
          Simple, transparent pricing that grows with you. Try any plan free for
          30 days.
        </p>
        <GradientButton
          type="primary"
          icon={<PlusOutlined />}
          className=" text-white px-5 py-2 h-auto rounded-lg shadow-lg hover:bg-[#012F60] transition-all flex items-center"
          onClick={() => showModal()}
        >
          Add Package
        </GradientButton>
      </div> */}

        {packages.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <p className="text-lg">No packages available.</p>
            <p>Click the "Add Package" button to create your first package.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {packages.map((pkg) => (
              <Card
                key={pkg.id}
                title={null}
                bordered={false}
                className={getCardStyle(pkg)}
                extra={null}
              >
                <div className="flex justify-end mb-2">
                  <div className="flex gap-2">
                    <Button
                      icon={<EditOutlined />}
                      onClick={() => showModal(pkg)}
                      className="text-gray-800 border-gray-800 hover:text-primary hover:border-primary"
                    />
                    {/* <Button
                    icon={<DeleteOutlined />}
                    onClick={() => handleDelete(pkg.id)}
                    className="text-red-600 border-red-300 hover:text-red-800 hover:border-red-500"
                  /> */}
                  </div>
                </div>

                <div className="flex flex-col justify-start items-start mb-4">
                  {/* <img
                    src={SubscriptionHeadingIcon}
                    alt="Subscription Icon"
                    className="w-[40px] h-[40px] mb-4"
                  /> */}
                  <h3 className={getTitleStyle(pkg)}>{pkg.title}</h3>
                  <div className="mb-2">
                    <span className={getPriceStyle(pkg)}>
                      ${pkg.price}
                      <span className={getDurationStyle(pkg)}>/year</span>
                    </span>
                    {/* <span className="text-gray-500 ml-2">/ {pkg.duration}</span> */}
                  </div>
                  <p className={getDescriptionStyle(pkg)}>{pkg.description}</p>
                </div>

                <div className="p-4 rounded-lg">
                  {/* <h4 className="font-semibold text-gray-700 mb-2">
                  Features Include:
                </h4> */}
                  <List
                    size="small"
                    dataSource={pkg.features}
                    renderItem={(feature) => (
                      <List.Item className="text-gray-700 border-none py-1">
                        <div className="flex items-start">
                          <CheckCircleFilled className="text-green-500 mr-2 text-[20px]" />
                          <span className={getFeatureStyle(pkg)}>
                            {feature}
                          </span>
                        </div>
                      </List.Item>
                    )}
                  />
                </div>
                {/* <Button className="w-full mt-12 border border-primary hover:!bg-primary hover:!text-white">
                Turn Off
              </Button> */}
                <Button
                  className={`w-full mt-12 border ${
                    pkg.active
                      ? "border-primary bg-primary text-white hover:!bg-white hover:!text-primary py-5 !border-lg"
                      : "border-white bg-white text-primary hover:!bg-primary hover:!text-white !hover:border-white py-5 !border-lg"
                  }`}
                  onClick={() => togglePackageStatus(pkg.id)}
                >
                  {pkg.active ? "Turn Off" : "Turn On"}
                </Button>
              </Card>
            ))}
          </div>
        )}

        <Modal
          title={isEditing ? "Edit Package" : "Add Package"}
          open={isModalOpen}
          onCancel={handleCancel}
          width={800}
          footer={[
            <Button key="cancel" onClick={handleCancel}>
              Cancel
            </Button>,
            <Button key="save" type="primary" onClick={() => form.submit()}>
              {isEditing ? "Update Package" : "Add Package"}
            </Button>,
          ]}
          className="rounded-lg"
        >
          <Form
            form={form}
            layout="vertical"
            onFinish={handleSubmit}
            className="mb-6"
          >
            <Row gutter={[30, 20]}>
              {/* Package Title */}
              <Col xs={24} sm={12} md={12}>
                <Form.Item
                  name="title"
                  label="Package Title"
                  rules={[{ required: true, message: "Title is required" }]}
                  className="custom-form-item-ant"
                >
                  <Input
                    placeholder="e.g. Basic Plan"
                    className="custom-input-ant-modal"
                  />
                </Form.Item>
              </Col>

              {/* Price */}
              <Col xs={24} sm={12} md={12}>
                <Form.Item
                  name="price"
                  label="Price"
                  rules={[{ required: true, message: "Price is required" }]}
                  className="custom-form-item-ant"
                >
                  <Input
                    type="number"
                    prefix="$"
                    placeholder="29.99"
                    className="custom-input-ant-modal"
                  />
                </Form.Item>
              </Col>

              {/* Duration */}
              <Col xs={24} sm={12} md={12}>
                <Form.Item
                  name="duration"
                  label="Duration"
                  rules={[{ required: true, message: "Duration is required" }]}
                  className="custom-form-item-ant-select"
                >
                  <Select
                    placeholder="Select duration"
                    className="custom-select-ant-modal"
                  >
                    <Select.Option value="1 month">1 Month</Select.Option>
                    <Select.Option value="3 months">3 Months</Select.Option>
                    <Select.Option value="6 months">6 Months</Select.Option>
                    <Select.Option value="1 year">1 Year</Select.Option>
                  </Select>
                </Form.Item>
              </Col>

              {/* Description */}
              <Col xs={24}>
                <Form.Item
                  name="description"
                  label="Description"
                  rules={[
                    { required: true, message: "Description is required" },
                  ]}
                  className="custom-form-item-ant"
                >
                  <Input.TextArea
                    rows={4}
                    placeholder="Short description of what this package offers"
                    disabled={isEditing}
                    className="custom-input-ant-modal"
                  />
                </Form.Item>
              </Col>

              {/* Features */}
              <Col xs={24}>
                <Form.Item
                  name="features"
                  label="Features"
                  rules={[
                    {
                      required: true,
                      message: "At least one feature is required",
                    },
                  ]}
                  className="custom-form-item-ant"
                >
                  <FeaturedInput />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Modal>
      </div>
    </div>
  );
};

export default PackagesPlans;
