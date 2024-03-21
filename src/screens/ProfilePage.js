import React, { useState, useEffect} from "react";
import { useNavigate } from 'react-router-dom';
import { getCurrentUser } from "aws-amplify/auth";
import {
  MenuOutlined,
  CheckCircleFilled,
  MinusCircleFilled,
} from "@ant-design/icons";
import {
  Drawer,
  Menu,
  Card,
  Progress,
  Row,
  Col,
} from "antd";
const { Meta } = Card;
// Import other icons here if needed and use them as intended



function ProfilePage(props) {
  const [openMenu, setOpenMenu] = useState(false);
  const [username, setUserName] = useState('');
  const [email, setUserEmail] = useState('');

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const user = await getCurrentUser();
        setUserName(user.username);
        setUserEmail(user.email);
      } catch (error) {
        console.error("Error fetching user information:", error);
      }
    };

    fetchUserInfo();
  }, []);

  return (
    <div style={{ height: "100vh", backgroundColor: "whit" }}>
      <div
        style={{
          background: "#9E2A2B",
          height: 60,
          paddingLeft: 16,
          paddingTop: 20,
        }}
        className="menuicon"
      >
        <MenuOutlined
          style={{ color: "white", fontSize: 20 }}
          onClick={() => {
            setOpenMenu(true);
          }}
        />
      </div>
      <span className="headerMenu">
        <AppMenu />
      </span>
      <Drawer
        placement="left"
        visible={openMenu}
        onClose={() => {
          setOpenMenu(false);
        }}
        closable={false}
        style={{ backgroundColor: "white" }}
      >
        <AppMenu isInline={true} />
      </Drawer>

      <div style={{ background: "white", padding: 20, minHeight: "100vh" }}>
        <h1 className="header1">Profile</h1>
        <h3 className="header3" style={{paddingTop:25}}>GENERAL INFORMATION</h3>
        <div style={{paddingTop:25}}>
            <div>
                <h4 className="header4" style={{paddingBottom:5}}>NAME</h4>
                <input 
                    defaultValue={username}
                    className="profile-input" 
                />
            </div>
            <div>
                <h4 className="header4" style={{paddingBottom:5}}>EMAIL</h4>
                <input 
                    defaultValue={email}
                    className="profile-input" 
                />
            </div>
        </div>
        <div style={{paddingTop:'40px'}}>
          <button style={{
              backgroundColor: "#9E2A2B",
              borderColor: "#9E2A2B",
              color: "white",
              height: "40px",
              borderRadius: "100px",
              width: "350px"
            }}
                  onClick={props.signOut}>Sign out
          </button>
        </div>
      </div>
    </div>
  );
}

function AppMenu({ isInline = false }) {
  // Corrected parameter destructuring
  const navigate = useNavigate();
  const handleClick = (e) => {
    // navigate to the route corresponding to the menu item key
    navigate(`/${e.key}`);
  };
  return (
    <Menu
      style={{ backgroundColor: "white", fontSize: 20, border: "none" }}
      mode={isInline ? "inline" : "horizontal"}
      onClick={handleClick}
      items={[
        {
          label: "CCHS Online Orientation",
          key: "home", // Corrected property name to lowercase
        },
        {
          label: "Orientation Recap",
          key: "recap",
        },
        {
          label: "FAQ",
          key: "faq",
        },
        {
          label: "Profile",
          key: "profile",
        },
      ]}
    ></Menu>
  );
}

export default ProfilePage;
