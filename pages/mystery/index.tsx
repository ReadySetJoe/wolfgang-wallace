import { useState } from "react";
import Page from "../../components/page";

const SECRET_KEYS = ["n", "o", "t", "h", "i", "n", "g"];
export default function Mystery() {
  const [secretKeyNdx, setSecretKeyNdx] = useState(0);
  const handleKeyPress = (e: any) => {
    console.log("e", e);
    console.log("e.key", e.key);
    if (e.key == SECRET_KEYS[secretKeyNdx]) {
      setSecretKeyNdx(secretKeyNdx + 1);
    } else {
      setSecretKeyNdx(0);
    }
  };

  return (
    <Page>
      <p>What is in the box below?</p>
      <input value={""} onKeyDown={handleKeyPress} />
      {secretKeyNdx === SECRET_KEYS.length && (
        <h1>Very good, let's continue</h1>
      )}
    </Page>
  );
}
