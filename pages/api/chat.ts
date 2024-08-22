import type { NextApiRequest, NextApiResponse } from "next";
import OpenAI from "openai";

const apiKey = process.env.OPEN_AI_KEY;
const openai = new OpenAI({ apiKey: apiKey });

// import text file from /public/assets call comatose.txt
const fs = require("fs");
const path = require("path");

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { question, history } = req.body;

    if (!Array.isArray(history)) {
      return res.status(400).json({ error: "History must be an array" });
    }
    const lyrics = {
      comatose: fs.readFileSync(
        path.resolve("./public/assets/comatose.txt"),
        "utf8"
      ),
      compulsoryEvacuationDevice: fs.readFileSync(
        path.resolve("./public/assets/compulsory-evacuation-device.txt"),
        "utf8"
      ),
      consequences: fs.readFileSync(
        path.resolve("./public/assets/consequences.txt"),
        "utf8"
      ),
      danceMacabre: fs.readFileSync(
        path.resolve("./public/assets/dance-macabre.txt"),
        "utf8"
      ),
      harbor: fs.readFileSync(
        path.resolve("./public/assets/harbor.txt"),
        "utf8"
      ),
      keepOut: fs.readFileSync(
        path.resolve("./public/assets/keep-out.txt"),
        "utf8"
      ),
      napoleon: fs.readFileSync(
        path.resolve("./public/assets/napoleon.txt"),
        "utf8"
      ),
      smileWide: fs.readFileSync(
        path.resolve("./public/assets/smile-wide.txt"),
        "utf8"
      ),
      tarot: fs.readFileSync(path.resolve("./public/assets/tarot.txt"), "utf8"),
      theLongCon: fs.readFileSync(
        path.resolve("./public/assets/the-long-con.txt"),
        "utf8"
      ),
    };

    try {
      // Here is where we communicate with the OpenAI API to create our chatbot.
      const response = await openai.chat.completions.create({
        messages: [
          {
            role: "system",
            content: `You are running an RPG game. You are a Game Master. This game is set in the lore for a band called Wolfgang Wallace. They are named after the main character in the lore of their songs. You are in a chat with a player who is asking you questions about the game.
              These are the lyrics to a few of their songs. Use as many references to these songs as you can to answer the player's questions. For example, in the song "Consequences", the song takes place in Mexico City. You could set an adventure there. The adventure should be set in the modern day, but secret societies, magic, and the supernatural are all real.
              Comatose: "${lyrics.comatose}"
              Compulsory Evacuation Device: "${lyrics.compulsoryEvacuationDevice}"
              Consequences: "${lyrics.consequences}"
              Dance Macabre: "${lyrics.danceMacabre}"
              Harbor: "${lyrics.harbor}"
              Keep Out: "${lyrics.keepOut}"
              Napoleon: "${lyrics.napoleon}"
              Smile Wide: "${lyrics.smileWide}"
              Tarot: "${lyrics.tarot}"
              The Long Con: "${lyrics.theLongCon}"
              `,
          },
          ...history,
          {
            role: "user",
            content: question,
          },
        ],
        model: "gpt-3.5-turbo",
        max_tokens: 300,
      });

      // Send the response back to the client
      res.status(200).json({ message: response.choices[0].message.content });
    } catch (error) {
      console.log("error", error);
      res.status(500).json({ error: "Error processing your request" });
    }
  } else {
    // Handle any other HTTP method
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
