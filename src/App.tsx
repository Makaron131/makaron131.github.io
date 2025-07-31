import "./App.css";
import { Menu, MenuProps } from "antd";
import { Route, Routes, useNavigate, useLocation } from "react-router-dom";
import Home from "./pages";
import Solution from "./pages/solution";

function App() {
  const navigate = useNavigate();
  const location = useLocation();

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

  const handleMenuChange: MenuProps["onClick"] = ({ key }) => navigate(key);

  return (
    <div className="layout">
      <div className="navbar">
        <div className="logo">Makaron131</div>
        <Menu
          className="topMenu"
          mode="horizontal"
          selectedKeys={[location.pathname]}
          items={MenuItems}
          onClick={handleMenuChange}
        />
      </div>

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
