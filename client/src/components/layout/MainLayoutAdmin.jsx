// import React, { useEffect } from "react";
// import { Outlet, Link } from "react-router-dom";
// import styles from "./MainLayout.module.css";
// import { getIsLogin, getUser, logout } from "../../utils/service";

// const MainLayoutAdmin = () => {
//   // const user = getUser();
//   // if(!user){
//   //   return null
//   // }

//   useEffect(() => {
//     if (!getIsLogin()) {
//       window.location.href = '/login';
//     }
//   }, []);

//   // useEffect(() => {
//   //   console.log('useEffect triggered');
//   //   if (!getIsLogin()) {
//   //     console.log('Not logged in, redirecting...');
//   //     window.location.href = '/login';
//   //   } else {
//   //     console.log('User is logged in');
//   //   }
//   // }, []);

//   const onLogout = () => {
//     logout()
//   }

//   return (
//     <div>
//       <ul className={styles.menu} style={{backgroundColor: 'gray'}}>
//         <li className={styles.item}>
//           <Link to={"/admin"}>Dashboard</Link>
//         </li>
//         <li className={styles.item}>
//           <Link to={"student"}>Student</Link>
//         </li>
//         <li className={styles.item}>
//           <Link to={"teacher"}>Teacher</Link>
//         </li>
//         <li className={styles.item}>
//           <a href="#" onClick={onLogout}>Logout</a>
//         </li>
//       </ul>
//       <div>
//         <Outlet />
//       </div>
//     </div>
//   );
// };

// export default MainLayoutAdmin;

import React, { useEffect, useState } from "react";
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  SmileOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Breadcrumb, Dropdown, Layout, Menu, theme } from "antd";
import { Link, Outlet, useNavigate } from "react-router-dom";
import styles from "./MainLayoutAdmin.module.css";
import { getIsLogin, getUser, logout } from "../../utils/service";

const { Header, Content, Footer, Sider } = Layout;

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const itemsMenu = [
  getItem(<Link to="/admin">Dashboard</Link>, "1", <PieChartOutlined />),
  getItem(<Link to="/admin/teacher">Teacher</Link>, "2", <DesktopOutlined />),
  getItem(<Link to="/admin/student">Student</Link>, "3", <DesktopOutlined />),
  getItem("Team", "sub2", <TeamOutlined />, [
    getItem(<Link to="/admin/team/team1">Team 1</Link>, "6"),
    getItem(<Link to="/admin/team/team2">Team 2</Link>, "8"),
  ]),
  getItem(<Link to="/admin/files">Files</Link>, "9", <FileOutlined />),
];

const items = [
  {
    key: "1",
    label: "Profile",
    icon: <SmileOutlined />,
  },
  {
    key: "2",
    label: "Change Password",
    icon: <SmileOutlined />,
  },
  {
    key: "3",
    label: "Setting",
    icon: <SmileOutlined />,
  },
  {
    key: "4",
    label: "Logout",
    icon: <SmileOutlined />,
    onClick: () => {
      logout();
    },
  },
];

const MainLayoutAdmin = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const user = getUser();
  if(!user){
    return null
  }

  // useEffect(() => {
  //   if (!getIsLogin()) {
  //     window.location.href = '/login';
  //   }
  // }, []);

  useEffect(() => {
    // console.log("useEffect triggered");
    if (!getIsLogin()) {
      window.location.href = "/login";
    }
  }, []);

  return (
    <Layout
      style={{
        minHeight: "100vh",
      }}
    >
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          defaultSelectedKeys={["1"]}
          mode="inline"
          items={itemsMenu}
        />
      </Sider>
      <Layout>
        <div className={styles.headerContainer}>
          <div className={styles.headerG1}>
            <div className={styles.logo}></div>
            <div>
              <div className={styles.brandName}>NIT</div>
              <div className={styles.subBrandName}>Build IT Skill</div>
            </div>
          </div>
          <div className={styles.headerG2}>
            <div className={styles.userImage}></div>
            <Dropdown menu={{ items }}>
              <div
                style={{
                  textAlign: "right",
                  cursor: "pointer",
                  color: "green",
                }}
              >
                <div className={styles.userName}>Admin</div>
                <div className={styles.roleName}>IT Manager</div>
              </div>
            </Dropdown>
          </div>
        </div>
        <Content
          style={{
            margin: "16px",
          }}
        >
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Outlet />
          </div>
        </Content>
        <Footer
          style={{
            textAlign: "center",
          }}
        >
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};

export default MainLayoutAdmin;
