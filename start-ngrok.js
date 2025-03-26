require("dotenv").config(); // Load environment variables from .env file
// start-ngrok.js
const ngrok = require("@ngrok/ngrok");

async function startNgrok() {
  try {
    // Make sure you're using the correct port where your Next.js app is running
    const port = process.env.PORT || 3000;

    console.log(`Starting ngrok tunnel to http://localhost:${port}...`);

    const listener = await ngrok.connect({
      addr: port,
      authtoken: process.env.NGROK_AUTHTOKEN,
      // Additional options for stability
      onStatusChange: (status) => {
        console.log(`Ngrok status changed: ${status}`);
      },
    });

    console.log(`
🚀 Ngrok tunnel established at: ${listener.url()}
📝 Use this URL in your Clerk webhook settings: ${listener.url()}/api/webhook/clerk
    `);

    // Keep the process running
    process.on("SIGINT", function () {
      console.log("Closing ngrok tunnel...");
      listener.close();
      process.exit();
    });
  } catch (error) {
    console.error("Error starting ngrok:", error);
  }
}

startNgrok();
