const axios = require("axios");
const Chat = require("./chatModel");

exports.chat = async (req, res) => {

const userMessage = req.body.message;

console.log("User message:", userMessage);

try {

const response = await axios.post(
"https://openrouter.ai/api/v1/chat/completions",
{
model: "openai/gpt-4o-mini",
messages: [
{
role: "user",
content: userMessage
}
]
},
{
headers: {
Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
"Content-Type": "application/json"
}
}
);

const aiResponse = response.data.choices[0].message.content;

// Save chat in MongoDB
await Chat.create({
userMessage: userMessage,
aiResponse: aiResponse
});

res.json({ reply: aiResponse });

} catch (error) {

console.log("FULL ERROR:", error.response?.data || error.message);

res.status(500).send("AI Error");

}

};