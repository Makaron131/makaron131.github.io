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
  const [navbarVisible, setNavbarVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

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

  // 处理移动端抽屉菜单按钮点击
  const handleMobileMenuClick = () => {
    setDrawerVisible(true);
    // 如果导航栏被隐藏，点击时显示导航栏
    if (!navbarVisible) {
      setNavbarVisible(true);
    }
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

  // 滚动监听，控制导航栏显示/隐藏
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const navbarHeight = 64; // 导航栏高度

      if (currentScrollY < navbarHeight) {
        // 在导航栏高度范围内，始终显示
        setNavbarVisible(true);
      } else if (
        currentScrollY > lastScrollY &&
        currentScrollY > navbarHeight
      ) {
        // 向下滚动且超过导航栏高度，隐藏导航栏
        setNavbarVisible(false);
      } else if (currentScrollY < lastScrollY) {
        // 向上滚动，显示导航栏
        setNavbarVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    // 节流处理，提升性能
    let ticking = false;
    const throttledHandleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", throttledHandleScroll, { passive: true });
    return () => window.removeEventListener("scroll", throttledHandleScroll);
  }, [lastScrollY]);

  return (
    <div className="layout">
      <div
        className={`navbar ${
          navbarVisible ? "navbar-visible" : "navbar-hidden"
        }`}
      >
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
              onClick={handleMobileMenuClick}
              className="mobile-menu-button"
            />
          )}
        </div>
      </div>

      {/* 浮动菜单按钮 - 当导航栏隐藏时显示 */}
      {!navbarVisible && (
        <Button
          type="primary"
          shape="circle"
          icon={<MenuOutlined />}
          onClick={() => setNavbarVisible(true)}
          className="floating-menu-button"
          size="large"
        />
      )}

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
