const socket = new WebSocket("ws://localhost:5002");

socket.onopen = () => {
  console.log("WebSocket connection established");

  // Send markdown chunk to the backend (Example chunk)
  socket.send("# Hello, this is a markdown chunk!");
};

socket.onmessage = (event) => {
  console.log("Received HTML chunk:", event.data);

  // Display the HTML chunk in the preview area
  document.getElementById("preview").innerHTML += event.data;
};

socket.onerror = (error) => {
  console.error("WebSocket error:", error);
};

socket.onclose = () => {
  console.log("WebSocket connection closed");
};
