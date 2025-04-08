import React, { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";

const AuthButtons = () => {
  const {
    loginWithRedirect,
    user,
    logout,
    isAuthenticated,
    getAccessTokenSilently,
  } = useAuth0();

//   useEffect(() => {
//     if (isAuthenticated && user) {
//       // Send welcome email when user is authenticated
//       fetch("http://localhost:3000/api/signup", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           email: user.email,
//           name: user.name,
//         }),
//       }).catch((error) => console.error("Error sending welcome email:", error));
//     }
//   }, [isAuthenticated, user]);

  return (
    <div>
      {isAuthenticated ? (
        <div>
          <p>Welcome {user.name}!</p>
          <button onClick={() => logout({ returnTo: window.location.origin })}>
            Log Out
          </button>
        </div>
      ) : (
        <button onClick={() => loginWithRedirect()}>Log In</button>
      )}
    </div>
  );
};

export default AuthButtons;
