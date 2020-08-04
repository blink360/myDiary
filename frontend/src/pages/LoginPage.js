import React from "react";
import LoginForm from "../components/LoginForm";
import axios from "axios";

function LoginPage(props) {
  document.title = "Login";
  const [loginInfo, setLoginInfo] = React.useState({
    username: "",
    isLoggedIn: "",
    userId: "",
  });

  let login = async (email, password) => {
    await axios
      .post("http://localhost:8000/user/login", {
        email: email,
        password: password,
      })
      .then((response) => {
        let { userId, username, state } = response.data;
        if (state === 1) {
          setLoginInfo({
            isLoggedIn: true,
            username: username,
            userId: userId,
          });
          sessionStorage.setItem("username", username);
          sessionStorage.setItem("userId", userId);
          sessionStorage.setItem("isLoggedIn", true);
        }
      })
      .catch((error) => {});
  };

  React.useEffect(() => {
    loginInfo.isLoggedIn === true
      ? props.history.push("/dashboard")
      : console.log();
  });

  return (
    <div>
      <LoginForm login={login} />
    </div>
  );
}

export default LoginPage;
