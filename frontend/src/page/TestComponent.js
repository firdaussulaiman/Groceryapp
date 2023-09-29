import React from "react";
import { useSelector } from "react-redux";

const TestComponent = () => {
  const userEmail = useSelector((state) => state.user.data.email);

  return (
    <div>
      <p>User Email: {userEmail}</p>
    </div>
  );
};

export default TestComponent;
