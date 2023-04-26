import axios from "axios";
import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import CreateNavBar from "./NavBar";
function Dashboard({ user }) {
  return (
    <>
      <CreateNavBar user={user} />
      {/* <h2>Welcome To Music Player {user ? user.username : ""}</h2> */}

      <Outlet context={{ user }} />
    </>
  );
}

function withUser(ChildComponent) {
  class HOC extends React.Component {
    state = {};
    componentDidMount() {
      this.checkForToken();
    }
    checkForToken = () => {
      const token = window.localStorage.getItem("token");
      if (!token) {
        window.location.href = "/sign-in";
        return;
      }

      axios
        .get("http://localhost:8080/api/users/session/user", {
          headers: {
            authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          const copyState = { ...this.state };
          copyState["user"] = res.data;
          this.setState(copyState);
        })
        .catch((err) => {
          console.log("Invalid Token");
          window.location.href = "/sign-in";
        });
    };
    render() {
      return <ChildComponent user={this.state.user} />;
    }
  }
  return HOC;
}

export default withUser(Dashboard);
