import React from "react";
import { DownOutlined, SmileOutlined, LogoutOutlined } from "@ant-design/icons";
import { Dropdown, Space, Button } from "antd";
import { Link } from "react-router-dom";
export default function DropUser({ Logout, user, lang = [] }) {
  const items = [
    {
      key: "1",
      label: (
        <Button
          type="text"
          onClick={Logout}
          danger
          style={{
            width: "100%",
            display: "flex",
          padding:0,
            justifyContent: "start",
          }}
          icon={<LogoutOutlined />}
        >
          {lang[2]}
        </Button>
      ),
    },
    {
      key: "2",
      label: (
        <Link
          target="_blank"
          style={{ display: "flex", alignItems: "center", gap: 8 }}
        >
          <SmileOutlined />
          {lang[1]}
        </Link>
      ),
      disabled: true,
    },
  ];

  return (
    <Dropdown menu={{ items }}>
      <Link onClick={(e) => e.preventDefault()} style={{ padding: "10px" }}>
        <Space>
          {lang[0]}
          {user?.map((c) => c.name).join(", ")}
          <DownOutlined />
        </Space>
      </Link>
    </Dropdown>
  );
}
