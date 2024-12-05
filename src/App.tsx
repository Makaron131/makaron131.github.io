import "./App.css";
import { Menu, MenuProps } from "antd";
import { Route, Routes, useNavigate } from "react-router-dom";
// import Home from "./pages";
import Solution from "./pages/solution";
import { useEffect } from "react";

function App() {
  const navigate = useNavigate();

  const MenuItems = [
    // {
    //   key: "/",
    //   label: "首页",
    // },
    {
      key: "/solution",
      label: "题解",
    },
  ];

  useEffect(() => {
    navigate("/solution");
  }, [navigate]);

  const handleMenuChange: MenuProps["onClick"] = ({ key }) => navigate(key);

  return (
    <div className="layout">
      <div className="navbar">
        <div className="logo">Makaron131</div>
        <Menu
          className="topMenu"
          mode="horizontal"
          defaultSelectedKeys={["/solution"]}
          items={MenuItems}
          onClick={handleMenuChange}
        />
      </div>

      <div className="content">
        <Routes>
          {/* <Route path="/" element={<Home />}></Route> */}
          <Route path="/solution" element={<Solution />}></Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
