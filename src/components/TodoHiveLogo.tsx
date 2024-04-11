import React from "react";

interface TodoHiveLogoProps {
  scaleTransform?: number;
}

const TodoHiveLogo: React.FC<TodoHiveLogoProps> = ({ scaleTransform = 1 }) => {
  return (
    <div
      style={{ display: "flex", alignItems: "center", marginBottom: "20px" }}
    >
      <img
        src="images/hive-logo.png"
        alt="logo"
        width={40 * scaleTransform}
        style={{ marginRight: `${20 * scaleTransform}px` }}
      />
      <span style={{ fontWeight: 600, fontSize: 55 * scaleTransform }}>
        TodoHive
      </span>
    </div>
  );
};

export default TodoHiveLogo;
