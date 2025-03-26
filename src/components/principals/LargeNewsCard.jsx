import React from "react";

function LargeNewsCard({ imageUrl, title, isModal ,summary,author,organization,content}) {
  return (
    <div style={{
      width: isModal ? "100%" : "100%", // Ajusta el ancho a un valor razonable
      margin: isModal ? "0" : "20px auto", // Centra el card con márgenes automáticos
      backgroundColor: "white",
      borderRadius: "10px",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      overflow: "hidden"
    }}>
      <img
        src={imageUrl}
        alt={title}
        style={{
          width: "100%",
          height: isModal ? "auto" : "300px",
          objectFit: "cover",
          borderTopLeftRadius: "10px",
          borderTopRightRadius: "10px"
        }}
      />
      <h3 style={{
        fontSize: "2em",
        fontWeight: "bold",
        textAlign: "center",
        margin: "20px 0"
      }}>
        {title}
      </h3>
    </div>
  );
}

export default LargeNewsCard;