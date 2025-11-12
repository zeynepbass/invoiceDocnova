
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { fetchInvoices, setSelectedInvoice } from "../../redux/invoiceSlice";
import { Table, Button, Tag, Space, Typography, Card, Empty } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";
import SearchBar from "../../components/Searchbar";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const { Title, Text } = Typography;

export default function InvoiceTable() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { invoices, loading, error } = useSelector((state) => state.invoice);
  const { user, companies, jwt } = useSelector((state) => state.user);
  const { t } = useTranslation();

  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    if (user && companies?.length > 0) {
      dispatch(
        fetchInvoices({
          companyId: companies[0].id,
          jwt,
          startDate: "2025-06-27T00:00:00.000Z",
          endDate: "2025-07-04T08:31:10.422Z",
          documentType: "OUTGOING",
          page: 0,
          size: 20,
          referenceDocument: "",
          type: null,
          status: null,
          paymentStatus: null,
          isDeleted: false,
        })
      );
    }
  }, [user, companies, dispatch, jwt]);

  const handleDetails = (record) => {
    dispatch(setSelectedInvoice(record));
    navigate("/details");
  };

  if (loading)
    return (
      <div style={{ textAlign: "center", padding: "40px", color: "gray" }}>
        <Text type="secondary">{t("loading")}...</Text>
      </div>
    );

  if (error)
    return (
      <div style={{ textAlign: "center", padding: "40px", color: "red" }}>
        <Text type="danger">{t("error")}</Text>
      </div>
    );

  const columns = [
    {
      title: t("companyId"),
      dataIndex: "companyId",
      key: "companyId",
      render: (text) => text?.slice(0, 6) || "-",
      width: 100,
      align: "center",
    },
    {
      title: t("customer"),
      dataIndex: "customerName",
      key: "customerName",
      width: 200,
      align: "center",
    },
    {
      title: t("invoiceNo"),
      dataIndex: "invoiceNumber",
      key: "invoiceNumber",
      width: 150,
      align: "center",
    },
    {
      title: t("issueDate"),
      dataIndex: "issueDate",
      key: "issueDate",
      render: (text) => (text ? new Date(text).toLocaleDateString() : "-"),
      align: "center",
    },
    {
      title: t("dueDate"),
      dataIndex: "dueDate",
      key: "dueDate",
      render: (text) => (text ? new Date(text).toLocaleDateString() : "-"),
      align: "center",
    },
    {
      title: t("amount"),
      key: "totalAmount",
      render: (_, record) => (
        <span style={{ fontWeight: 600, color: "#1890ff" }}>
          {record.paymentDetails?.totalAmount?.toFixed(2) || 0} €
        </span>
      ),
      align: "center",
    },
    {
      title: t("status"),
      key: "paymentStatus",
      render: (_, record) => {
        const status = record.paymentDetails?.paymentStatus;
        const colorMap = {
          SENT: "green",
          PENDING: "orange",
          FAILED: "red",
        };
        return <Tag color={colorMap[status] || "default"}>{status || "-"}</Tag>;
      },
      align: "center",
    },
    {
      title: t("actions"),
      key: "actions",
      render: (_, record) => (
        <Button
          type="primary"
          icon={<InfoCircleOutlined />}
          onClick={() => handleDetails(record)}
          style={{
            width: "100%",
            height: 40,
            fontWeight: 500,
            borderRadius: 6,
          }}
        >
          {t("details")}
        </Button>
      ),
      align: "center",
    },
  ];

  const allInvoices = invoices?.invoices?.content || [];
  const filteredInvoices = allInvoices.filter((inv) =>
    JSON.stringify(inv).toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <Card
      bordered={false}
      style={{
        background: "#fff",
        borderRadius: 12,
        padding: 16,
        boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
      }}
    >

      <Space
        direction="horizontal"
        style={{
          width: "100%",
          justifyContent: "space-between",
          marginBottom: 20,
        }}
      >
        <Title level={4} style={{ margin: 0 }}>
          {t("invoices")}
        </Title>

        <SearchBar
          placeholder={t("searchPlaceholder") }
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          style={{ width: 280 }}
        />
      </Space>


      <Table
        rowKey="id"
        dataSource={filteredInvoices}
        columns={columns}
        pagination={{
          pageSize: 5,
          showSizeChanger: false,
        }}
        bordered
        size="middle"
        locale={{
          emptyText: <Empty description={t("noData") } />,
        }}
        scroll={{ x: 1200 }}
      />
    </Card>
  );
}
