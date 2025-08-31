import React from "react";
import { Modal, Form, Input, Select, Row, Col, Button } from "antd";

const { Option } = Select;
import { Upload, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";

const AddVerifiedBadge = ({ visible, onCancel, onSave }) => {
  const [form] = Form.useForm();

  const handleSave = () => {
    form
      .validateFields()
      .then((values) => {
        onSave(values);
        form.resetFields();
      })
      .catch((info) => console.log("Validate Failed:", info));
  };

  return (
    <Modal
      title="Add Verified Breeder"
      open={visible}
      onCancel={onCancel}
      width={1200}
      footer={[
        <Button key="cancel" onClick={onCancel}>
          Cancel
        </Button>,
        <Button key="save" type="primary" onClick={handleSave}>
          Add Verified Breeder
        </Button>,
      ]}
    >
      <Form form={form} layout="vertical" className="mb-6">
        <Row gutter={[30, 20]}>
          <Col xs={24} sm={12} md={8}>
            <Form.Item
              label="Ring Number"
              name="ringNumber"
              rules={[{ required: true }]}
              className="custom-form-item-ant"
            >
              <Input
                placeholder="Enter Ring Number"
                className="custom-input-ant-modal"
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Form.Item
              label="Name"
              name="name"
              rules={[{ required: true }]}
              className="custom-form-item-ant"
            >
              <Input
                placeholder="Enter Name"
                className="custom-input-ant-modal" // <-- apply directly here
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Form.Item
              label="Choose a Category"
              name="category"
              className="custom-form-item-ant-select"
            >
              <Select
                placeholder="Select Category"
                className="custom-select-ant-modal"
              >
                <Option value="racing">Racing</Option>
                <Option value="breeding">Breeding</Option>
                <Option value="lost">Lost</Option>
                <Option value="sold">Sold</Option>
                <Option value="retired">Retired</Option>
                <Option value="deceased">Deceased</Option>
              </Select>
            </Form.Item>
          </Col>

          <Col xs={24} sm={12} md={8}>
            <Form.Item
              label="Birth Year"
              name="birthYear"
              className="custom-form-item-ant"
            >
              <Input
                placeholder="Enter Birth Year"
                className="custom-input-ant-modal"
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Form.Item
              label="Your Story"
              name="story"
              className="custom-form-item-ant"
            >
              <Input
                placeholder="Enter Story"
                className="custom-input-ant-modal"
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Form.Item
              label="Color"
              name="color"
              className="custom-form-item-ant-select"
            >
              <Select
                placeholder="Select Color"
                className="custom-select-ant-modal"
              >
                <Option value="red">Red</Option>
                <Option value="blue">Blue</Option>
                <Option value="green">Green</Option>
                <Option value="yellow">Yellow</Option>
              </Select>
            </Form.Item>
          </Col>

          <Col xs={24} sm={12} md={8}>
            <Form.Item
              label="Pattern"
              name="pattern"
              className="custom-form-item-ant-select"
            >
              <Select
                placeholder="Select Pattern"
                className="custom-select-ant-modal"
              >
                <Option value="solid">Solid</Option>
                <Option value="spotted">Spotted</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Form.Item
              label="Gender"
              name="gender"
              className="custom-form-item-ant-select"
            >
              <Select
                placeholder="Select Gender"
                className="custom-select-ant-modal"
              >
                <Option value="male">Male</Option>
                <Option value="female">Female</Option>
              </Select>
            </Form.Item>
          </Col>

          <Col xs={24} sm={12} md={8}>
            <Form.Item
              label="Breeder"
              name="breeder"
              className="custom-form-item-ant-select"
            >
              <Select
                placeholder="Select Breeder"
                className="custom-select-ant-modal"
              >
                <Option value="breederA">Breeder A</Option>
                <Option value="breederB">Breeder B</Option>
              </Select>
            </Form.Item>
          </Col>

          <Col xs={24} sm={12} md={8}>
            <Form.Item
              label="Breeder Rating"
              name="breederRating"
              className="custom-form-item-ant-select"
            >
              <Select
                placeholder="Select Rating"
                className="custom-select-ant-modal"
              >
                <Option value="1">1</Option>
                <Option value="2">2</Option>
                <Option value="3">3</Option>
                <Option value="4">4</Option>
                <Option value="5">5</Option>
              </Select>
            </Form.Item>
          </Col>

          <Col xs={24} sm={12} md={8}>
            <Form.Item
              label="Status"
              name="status"
              className="custom-form-item-ant-select"
            >
              <Select
                placeholder="Select Status"
                className="custom-select-ant-modal"
              >
                <Option value="active">Active</Option>
                <Option value="inactive">Inactive</Option>
                <Option value="pending">Pending</Option>
              </Select>
            </Form.Item>
          </Col>

          <Col xs={24} sm={12} md={8}>
            <Form.Item
              label="Location"
              name="location"
              className="custom-form-item-ant"
            >
              <Input
                placeholder="Enter Location"
                className="custom-input-ant-modal"
              />
            </Form.Item>
          </Col>

          <Col xs={24} sm={12} md={8}>
            <Form.Item
              label="Racing Rating"
              name="racingRating"
              className="custom-form-item-ant-select"
            >
              <Select
                placeholder="Select Rating"
                className="custom-select-ant-modal"
              >
                <Option value="1">1</Option>
                <Option value="2">2</Option>
                <Option value="3">3</Option>
                <Option value="4">4</Option>
                <Option value="5">5</Option>
              </Select>
            </Form.Item>
          </Col>

          <Col xs={24} sm={12} md={8}>
            <Form.Item
              label="Verification"
              name="verification"
              className="custom-form-item-ant-select"
            >
              <Select
                placeholder="Select Verification"
                className="custom-select-ant-modal"
              >
                <Option value="verified">Verified</Option>
                <Option value="notverified">Not Verified</Option>
              </Select>
            </Form.Item>
          </Col>

          <Col xs={24} sm={12} md={8}>
            <Form.Item
              label="Iconic"
              name="iconic"
              className="custom-form-item-ant-select"
            >
              <Select
                placeholder="Select Iconic"
                className="custom-select-ant-modal"
              >
                <Option value="yes">Yes</Option>
                <Option value="no">No</Option>
              </Select>
            </Form.Item>
          </Col>

          <Col xs={24} sm={12} md={8}>
            <Form.Item
              label="Iconic Score"
              name="iconicScore"
              className="custom-form-item-ant"
            >
              <Input
                placeholder="Enter Iconic Score"
                className="custom-input-ant-modal"
              />
            </Form.Item>
          </Col>

          <Col xs={24} sm={12} md={8}>
            <Form.Item
              label="Father Ring Number"
              name="fatherRingNumber"
              className="custom-form-item-ant"
            >
              <Input
                placeholder="Enter Father Ring Number"
                className="custom-input-ant-modal"
              />
            </Form.Item>
          </Col>

          <Col xs={24} sm={12} md={8}>
            <Form.Item
              label="Mother Ring Number"
              name="motherRingNumber"
              className="custom-form-item-ant"
            >
              <Input
                placeholder="Enter Mother Ring Number"
                className="custom-input-ant-modal"
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={12}>
            <Form.Item label="Pigeon Photos" name="photos">
              <Upload
                name="files"
                listType="picture-card"
                multiple
                className="border rounded-lg p-3 border-[#071952]"
                maxCount={5} // optional: limit number of uploads
                showUploadList={{
                  showPreviewIcon: true,
                  showRemoveIcon: true,
                }}
                beforeUpload={(file) => {
                  const isJpgOrPng =
                    file.type === "image/jpeg" || file.type === "image/png";
                  if (!isJpgOrPng) {
                    message.error("You can only upload JPG/PNG files!");
                  }
                  return isJpgOrPng || Upload.LIST_IGNORE; // ignore non-JPG/PNG files
                }}
                accept=".jpg,.jpeg,.png" // only allow these extensions in file picker
                onChange={({ fileList }) => {
                  console.log(fileList); // store selected files if needed
                }}
              >
                <div
                  style={{
                    width: 150,
                    height: 150,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <PlusOutlined />
                  <div style={{ marginTop: 8 }}>Upload</div>
                </div>
              </Upload>
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={12}>
            <Form.Item label="Pigeon Result" name="additionalNotes">
              <Input.TextArea
                placeholder="Enter any additional notes"
                autoSize={{ minRows: 5, maxRows: 8 }} // auto-expand from 4 up to 8 rows
                className="custom-input-ant-modal"
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default AddVerifiedBadge;
