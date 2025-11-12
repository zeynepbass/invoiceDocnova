import { Form, Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";

export default function Searchbar({
  name,
  placeholder,
  rules,
  style,
  value,
  onChange,
  ...rest
}) {
  return (
    <Form.Item name={name} rules={rules} style={{ marginBottom: 0 }}>
      <Input
        placeholder={placeholder}
        prefix={<SearchOutlined />}
        value={value}
        onChange={onChange}
        {...rest}
        style={{
 
          padding: "8px 12px",
          ...style,
        }}
      />
    </Form.Item>
  );
}
