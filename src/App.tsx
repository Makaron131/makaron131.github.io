import "./App.css";
import { Menu, MenuProps, Drawer, Button } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import { Route, Routes, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import Home from "./pages";
import Solution from "./pages/solution";

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const MenuItems = [
    {
      key: "/",
      label: "首页",
    },
    {
      key: "/solution",
      label: "题解",
    },
  ];

  const handleMenuChange: MenuProps["onClick"] = ({ key }) => {
    navigate(key);
    setDrawerVisible(false); // 移动端点击后关闭抽屉
  };

  // 检测屏幕尺寸
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  return (
    <div className="layout">
      <div className="navbar">
        <div className="navbar-content">
          <div className="logo">Makaron131</div>

          {/* 桌面端菜单 */}
          {!isMobile && (
            <div className="desktop-menu-container">
              <Menu
                className="topMenu"
                mode="horizontal"
                selectedKeys={[location.pathname]}
                items={MenuItems}
                onClick={handleMenuChange}
              />
            </div>
          )}

          {/* 移动端菜单按钮 */}
          {isMobile && (
            <Button
              type="text"
              icon={<MenuOutlined />}
              onClick={() => setDrawerVisible(true)}
              className="mobile-menu-button"
            />
          )}
        </div>
      </div>

      {/* 移动端抽屉菜单 */}
      <Drawer
        title="导航菜单"
        placement="right"
        onClose={() => setDrawerVisible(false)}
        open={drawerVisible}
        className="mobile-drawer"
      >
        <Menu
          mode="vertical"
          selectedKeys={[location.pathname]}
          items={MenuItems}
          onClick={handleMenuChange}
          className="drawer-menu"
        />
      </Drawer>

      <div className="content">
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/solution" element={<Solution />}></Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
