import { gql, useMutation } from "@apollo/client";
import { Box, TextField } from "@mui/material";
import AWS from "aws-sdk";
import { useState } from "react";
import Page from "../../components/page";

const S3_BUCKET = "wolfgang-wallace";
const REGION = "us-east-2";

AWS.config.update({
  accessKeyId: "AKIAXGU434Y2CDTCIHOC",
  secretAccessKey: "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",
});

const myBucket = new AWS.S3({
  params: { Bucket: S3_BUCKET },
  region: REGION,
});

const CREATE_LORE_PAGE = gql`
  mutation CreateLorePage(
    $title: String
    $content: String
    $image: String
    $authorId: String!
  ) {
    createLorePage(
      title: $title
      content: $content
      authorId: $authorId
      image: $image
    ) {
      title
    }
  }
`;

export default function Admin() {
  const [createLorePage] = useMutation(CREATE_LORE_PAGE);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");

  const [progress, setProgress] = useState(0);

  const handleFileInput = (e) => {
    const file = e.target.files[0];
    console.log("file.name", file.name);
    const params = {
      ACL: "public-read",
      Body: file,
      Bucket: S3_BUCKET,
      Key: file.name,
    };

    const res = myBucket
      .putObject(params, (err, data) => {
        console.log("data", data);
      })
      .on("httpUploadProgress", (evt) => {
        setProgress(Math.round((evt.loaded / evt.total) * 100));
      });
    setImage(`https://${S3_BUCKET}.s3.${REGION}.amazonaws.com/${file.name}`);
    console.log("res", res);
  };

  return (
    <Page>
      <p>This is the admin page. Let's create new lore</p>
      <Box
        component="form"
        sx={{
          "& > :not(style)": { m: 2 },
          display: "flex",
          flexDirection: "column",
          maxWidth: "600px",
        }}
      >
        <TextField
          label="Title"
          variant="filled"
          color="info"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextField
          label="Content"
          variant="filled"
          color="info"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          multiline
          minRows={3}
        />
        {image ? (
          <div>
            <img
              src={image}
              style={{ width: "100%", cursor: "pointer" }}
              onClick={() => setImage("")}
            />
          </div>
        ) : (
          <label
            style={{
              height: "100px",
              padding: "2rem",
              border: "1px gray solid",
              textAlign: "center",
              cursor: "pointer",
            }}
          >
            <input
              type="file"
              onChange={handleFileInput}
              style={{ display: "none" }}
            />
            Upload Image
          </label>
        )}
        {progress !== 0 && progress !== 100 && <p>Progress: {progress}%</p>}
        <button
          onClick={async (e) => {
            e.preventDefault();
            await createLorePage({
              variables: {
                title,
                content,
                image,
                authorId: "123",
              },
            });
          }}
        >
          submit.
        </button>
      </Box>
    </Page>
  );
}
