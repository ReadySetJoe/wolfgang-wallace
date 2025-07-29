import { Stack } from "@mui/system";
import Image from "next/image";

import Page from "../../components/page";
import band from "../../images/band-art-landscape.jpeg";
import dsImg from "../../images/dark-spectre-image.jpg";
import joeImg from "../../images/joe-image.jpeg";
import wallyImg from "../../images/wally-image.jpeg";

const MEMBER_BIOS = {
  wally: {
    name: "Wally",
    position: "songwriter, lead vox, rhthym guitar",
    image: wallyImg,
  },
  joe: {
    name: "Joe",
    position: "harmony vox/lead guitar",
    image: joeImg,
  },
  austin: {
    name: "Austin",
    position: "bass guitar",
    image: null,
  },
  drummer: {
    name: "Shane",
    position: "drummer",
    image: null, // Placeholder for drummer image
  },
  ds: {
    name: "The Dark Spectre",
    position: "resident artist",
    image: dsImg,
  },
};

export default function Band() {
  return (
    <Page>
      <Stack>
        <h1>This is the band page. Welcome.</h1>
        <h2>WHO WE ARE:</h2>
        <h3>
          We're wolfgang wallace. This is an artist rendering. It is NOT a
          police sketch. We swear.
        </h3>
        <Image
          src={band}
          alt="artist's rendering"
          style={{ width: "100%", height: "auto", margin: "16px 0px" }}
          sizes="(max-width: 600px) 100vw, 400px"
        />
        <h2>MEMBERS:</h2>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(auto-fit, minmax(200px, 1fr))",
            },
            gap: 2,
            justifyItems: "center",
            alignItems: "center",
          }}
        >
          {Object.entries(MEMBER_BIOS).map(([key, member]) => (
            <Stack key={key} spacing={1} alignItems="center">
              {member.image ? (
                <Image
                  src={member.image}
                  alt={member.name}
                  style={{
                    width: "300px",
                    height: "300px",
                    borderRadius: "50%",
                    objectFit: "cover",
                    border: "2px solid white",
                  }}
                />
              ) : (
                <div
                  style={{
                    width: "300px",
                    height: "300px",
                    borderRadius: "50%",
                    backgroundColor: "#ccc",
                    border: "2px solid white",
                  }}
                />
              )}

              <h3>{member.name}</h3>
              <p>{member.position}</p>
            </Stack>
          ))}
        </Stack>
      </Stack>
    </Page>
  );
}
