import React, { useState } from "react";
import { imageUrl } from "../../redux/api/baseApi";
import { Link, useNavigate } from "react-router-dom";
import { FaRegBell } from "react-icons/fa6";
import { Badge, Button, Dropdown, Menu, Modal } from "antd";
import { useUser } from "../../provider/User";
import { IoIosLogOut } from "react-icons/io";
import Avatar from "../../assets/avatar.png";

const Header = () => {
  const { user } = useUser();
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const navigate = useNavigate();

  const src = user?.image?.startsWith("https")
    ? user?.image
    : `${imageUrl}/${user?.image}`;

  const showLogoutConfirm = () => {
    setIsLogoutModalOpen(true); // Show the confirmation modal
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLogoutModalOpen(false); // Close the modal
    navigate("/auth/login");
  };

  const handleCancelLogout = () => {
    setIsLogoutModalOpen(false); // Close the confirmation modal
  };

  const menu = (
    <Menu>
      <Menu.Item key="settings">
        <Link to="/profile">Settings</Link>
      </Menu.Item>
      <Menu.Item
        key="logout"
        danger
        onClick={showLogoutConfirm}
        style={{ display: "flex", alignItems: "center" }}
      >
        Logout
      </Menu.Item>
    </Menu>
  );

  return (
    <div className="flex items-center justify-between gap-5 w-full px-4 py-6 bg-[#F2F2F2] lg:px-10">
      <h2 className="font-bold text-xl text-secondary">
        {/* Super Admin Dashboard */}
      </h2>
      <div className="flex items-center gap-5">
        {/* Profile Icon with Dropdown Menu */}
        <Dropdown overlay={menu} trigger={["click"]} placement="bottomRight">
          <div className="flex items-center gap-3 cursor-pointer">
            <div className="flex flex-row gap-1">
              <p>Hello,</p> <p className="text-[16px] font-semibold">Sabbir</p>
            </div>
            <img
              style={{
                clipPath: "circle()",
                width: 45,
                height: 45,
              }}
              src={Avatar}
              alt="profile-pic"
              className="clip"
            />
          </div>
        </Dropdown>
        {/* Notification Icon */}
        <Link to="/notification" className="h-fit mt-[10px]">
          <Badge count={5} backgroundColor="#071952">
            <FaRegBell color="#071952" size={24} />
          </Badge>
        </Link>
      </div>

      {/* Logout Confirmation Modal */}
      <Modal
        title="Confirm Logout"
        visible={isLogoutModalOpen}
        onCancel={handleCancelLogout}
        footer={[
          <Button key="cancel" onClick={handleCancelLogout}>
            Cancel
          </Button>,
          <Button key="logout" danger onClick={handleLogout}>
            Logout
          </Button>,
        ]}
      >
        <p>Are you sure you want to log out?</p>
      </Modal>
    </div>
  );
};

export default Header;
