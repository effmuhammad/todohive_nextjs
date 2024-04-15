import React from "react";

const FooterText: React.FC = ({}) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        position: "absolute",
        left: 30,
        bottom: 10,
        fontSize: 14,
        fontWeight: 300,
        fontStyle: "italic",
      }}
    >
      <span>
        by Effry Muhammad
        {/* for PT Sat Nusapersada Take Home Test */}
        <br />
        <span style={{ fontSize: 12 }}>
          design by Varun Gupta on Figma Community
        </span>
      </span>
    </div>
  );
};

export default FooterText;
