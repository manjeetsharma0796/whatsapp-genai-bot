const { Client, LocalAuth } = require("whatsapp-web.js");
const qrcode = require("qrcode-terminal");
const run = require("./gemini");
const c_config = {
  puppeteer: {
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
    headless: true,
  },
  authStrategy: new LocalAuth({
    clientId: "YOUR_ID",
  }),
  webVersionCache: {
    type: "remote",
    remotePath:
      "https://raw.githubusercontent.com/wppconnect-team/wa-version/main/html/2.2412.54.html",
  },
};
const client = new Client(c_config);

client.on("message", async (message) => {
  if (message.body === "hello" || message.body === "hi") {
    message.reply("Moshi moshi, Konichiwa");
  }else{
    const botResponse = await run( message.body)
    console.log(botResponse)
    message.reply(botResponse)
  }
});

client.on("ready", () => {
  console.log("Client is ready!");
});

client.on("qr", (qr) => {
  qrcode.generate(qr, { small: true });
});

client.initialize();
