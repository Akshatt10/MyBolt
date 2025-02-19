"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
require("dotenv").config();
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
if (!GEMINI_API_KEY) {
    throw new Error("Missing GEMINI_API_KEY in .env file");
}
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent?key=${GEMINI_API_KEY}`;
        const requestBody = {
            contents: [
                {
                    role: "user", // Equivalent to Claude's "role"
                    parts: [{ text: "What is 2+2?" }],
                },
            ],
            generationConfig: {
                temperature: 0.7, // Controls randomness
                maxOutputTokens: 500, // Limits response length
                topP: 0.95, // Controls diversity
                topK: 50, // Filters high-probability words
            },
        };
        try {
            const response = yield fetch(url, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(requestBody),
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = yield response.json();
            console.log("Response from Gemini API:", JSON.stringify(data, null, 2));
        }
        catch (error) {
            console.error("Error:", error);
        }
    });
}
main();
