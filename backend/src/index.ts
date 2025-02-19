require("dotenv").config();

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

if (!GEMINI_API_KEY) {
  throw new Error("Missing GEMINI_API_KEY in .env file");
}

async function main() {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent?key=${GEMINI_API_KEY}`;

  const requestBody = {
    contents: [
      {
        role: "user", // Equivalent to Claude's "role"
        parts: [{ text: "What is 2+2?" }],
      },
    ],
    generationConfig: {
      temperature: 1,  // Controls randomness
      maxOutputTokens: 5000,  // Limits response length  // Filters high-probability words
    },
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log("Response from Gemini API:", JSON.stringify(data, null, 2));
  } catch (error) {
    console.error("Error:", error);
  }
}

main();
