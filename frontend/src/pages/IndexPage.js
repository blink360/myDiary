import React from "react";

const IndexPage = (props) => {
  React.useEffect(() => {
    const isLoggedIn = sessionStorage.getItem("isLoggedIn");
    if (!isLoggedIn) {
      props.history.push("/login");
    } else {
      props.history.push("/dashboard");
    }
    //eslint-disable-next-line
  }, [0]);
  return <div></div>;
};

export default IndexPage;
