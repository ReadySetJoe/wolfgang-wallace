import Image from "next/image";
import { Stack } from "@mui/system";

import styles from "../../styles/band.module.css";
import Page from "../../components/page";
import band from "../../images/band-art-landscape.jpeg";
import joeImg from "../../images/joe-image.jpeg";
import wallyImg from "../../images/wally-image.jpeg";
import dsImg from "../../images/dark-spectre-image.jpg";

import { useState } from "react";

const MEMBER_BIOS = {
  gavin: {
    name: "Gavin",
    position: "drummer",
    bio: "some stuff about gavin",
  },
  joe: {
    name: "Joe",
    position: "harmony vox/lead guitar",
    bio: "Some stuff about me",
    image: joeImg,
  },
  wally: {
    name: "Wally",
    position: "songwriter, lead vox, rhthym guitar",
    bio: "Some stuff about Wally",
    image: wallyImg,
  },
  ds: {
    name: "The Dark Spectre",
    position: "Artistic Director",
    bio: "Some wacky stuff about the dark spectre",
    image: dsImg,
  },
};

// TODO: Change from using static image hosting to just throwing it an S3 bucket

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
        <Image width={400} src={band} alt="artist's rendering" />
        <h2>WHAT WE'VE DONE:</h2>
      </Stack>
    </Page>
  );
}
