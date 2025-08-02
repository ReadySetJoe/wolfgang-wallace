import { useState } from "react";
import { EyePlacements } from "../../utils/eyePlacements";
import Page from "../../components/Page";

interface Message {
  role: "user" | "assistant";
  content: string | React.ReactNode;
}

const Home = () => {
  const [conversation, setConversation] = useState<Message[]>([
    {
      role: "assistant",
      content: (
        <>
          Welcome to the Wolfgang Wallace RPG. Describe who you are, and what it
          is you seek. {EyePlacements.RpgCharacter()}
        </>
      ),
    },
  ]);
  const [inputValue, setInputValue] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setInputValue(e.target.value);

  const handleSubmit = async () => {
    if (!inputValue.trim()) return;

    setIsLoading(true);

    const userMessage: Message = { role: "user", content: inputValue };
    setConversation((prev) => [...prev, userMessage]);
    setInputValue("");

    try {
      // Convert conversation history to plain text for API
      const plainHistory = conversation.map((msg) => ({
        role: msg.role,
        content:
          typeof msg.content === "string"
            ? msg.content
            : "Welcome to the Wolfgang Wallace RPG. Describe who you are, and what it is you seek.",
      }));

      const apiResponse = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question: inputValue,
          history: plainHistory,
        }),
      });

      if (!apiResponse.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await apiResponse.json();

      const assistantMessage: Message = {
        role: "assistant",
        content: data.message,
      };
      setConversation((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Error:", error);
      const errorMessage: Message = {
        role: "assistant",
        content: "Sorry, there was an error processing your request.",
      };
      setConversation((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Page>
      <div
        style={{
          maxWidth: "600px",
          margin: "0 auto",
          padding: "20px",
          position: "relative",
        }}
      >
        <div
          style={{
            height: "400px",
            overflowY: "auto",
            border: "1px solid #ccc",
            padding: "10px",
            marginBottom: "20px",
          }}
        >
          {conversation.map((message, index) => (
            <div
              key={index}
              style={{
                marginBottom: "10px",
                textAlign: message.role === "user" ? "right" : "left",
              }}
            >
              <span
                style={{
                  display: "inline-block",
                  padding: "8px",
                  borderRadius: "8px",
                  backgroundColor:
                    message.role !== "user" ? "black" : "#f1f1f1",
                  color: message.role !== "user" ? "white" : "black",
                }}
              >
                {message.content}
                {message.role === "user" && index === 1 && (
                  <div>{EyePlacements.RpgQuest()}</div>
                )}
              </span>
            </div>
          ))}
        </div>
        <div style={{ display: "flex" }}>
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            style={{
              flexGrow: 1,
              marginRight: "10px",
              padding: "8px",
              border: "1px solid #ccc",
              borderRadius: "4px",
            }}
            placeholder="Say something..."
            disabled={isLoading}
          />
          <button
            onClick={handleSubmit}
            style={{
              padding: "8px 16px",
              backgroundColor: "black",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
            disabled={isLoading}
          >
            {isLoading ? "Sending..." : "Speak"}
          </button>
        </div>
        <div style={{ marginTop: "30px", textAlign: "center" }}>
          {EyePlacements.RpgSecret()}
        </div>
      </div>
    </Page>
  );
};

export default Home;
