import { useEffect } from "react";
import {  Row, Col, Space } from "antd";
import Select from "../../../components/Select";
import Dropdown from "../../../components/Dropdown";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../redux/userSlice";
import { useTranslation } from "react-i18next";

export default function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.companies);
  const lang = useSelector((state) => state.language.lang);
  const { t, i18n } = useTranslation();

  useEffect(() => {
    if (lang) {
      i18n.changeLanguage(lang);
    }
  }, []);

  const Logout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <header
      style={{
        backgroundColor: "#f0f5ff",
        padding: "0.5rem 2rem",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
      }}
    >
      <Row align="middle" justify="space-between">
        <Col>
          <Link to="/docnova">
            <div style={{ display: "flex", alignItems: "center" }}>
              <img
                src="/assets/image006.png"
                alt="Logo"
                style={{ height: 50 }}
              />
              <p style={{ color: "gray", fontSize: "0.7rem", marginLeft: 8 }}>
                Docnova
              </p>
            </div>
          </Link>
        </Col>
       
        <Col style={{ display: "flex", justifyContent: "flex-end" }}>
          <Space>
         
            <Select />
          </Space>
          <Dropdown
          Logout={Logout}
          user={user}
          lang={[t("welcome"), t("soon"), t("logout")]}
        />
        </Col>

  
      </Row>
    </header>
  );
}
