import { NextRequest, NextResponse } from "next/server";

import { Part } from "@google/generative-ai";
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(req: NextRequest) {
  try {
    const { userInput, imageBase64 } = await req.json();

    if (!userInput || typeof userInput !== "string") {
      return NextResponse.json(
        { error: "userInput is required and must be a string" },
        { status: 400 }
      );
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
    const model = genAI.getGenerativeModel({ model: "gemini-pro-vision" });

    // Construct input parts
    const inputParts: (string | Part)[] = [{ text: userInput }];

    if (imageBase64) {
      inputParts.push({
        inlineData: { data: imageBase64, mimeType: "image/jpeg" },
      });
    }

    const result = await model.generateContent(inputParts);
    const response = await result.response;
    const generatedText =
      (await response.text()) || "Sorry, I couldn't generate content.";

    return NextResponse.json({ generatedText });
  } catch (error) {
    console.error("Error generating content:", error);
    return NextResponse.json(
      { error: "Error generating content" },
      { status: 500 }
    );
  }
}
