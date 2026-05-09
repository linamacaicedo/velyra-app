function ThankYou() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background:
          "linear-gradient(180deg, #F5F2FF 0%, #D8B4FE 100%)"
      }}
    >
      <div
        style={{
          backgroundColor: "white",
          padding: "40px",
          borderRadius: "24px",
          textAlign: "center",
          boxShadow: "0 20px 40px rgba(0,0,0,0.1)"
        }}
      >
        <h1
          style={{
            color: "#5B4CF0",
            fontSize: "42px",
            marginBottom: "12px"
          }}
        >
          Thank You!
        </h1>

        <p
          style={{
            color: "#666",
            fontSize: "18px"
          }}
        >
          Your vote has been submitted successfully.
        </p>
      </div>
    </div>
  );
}

export default ThankYou;