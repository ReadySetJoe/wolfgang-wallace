import Page from "../../components/page";
import { gql, useMutation, useQuery } from "@apollo/client";
import { Box, TextField } from "@mui/material";
import { useState } from "react";

// const GET_USERS = gql`
//   query GetUsers {
//     getUsers {
//       id
//       email
//     }
//   }
// `;

// Define mutation
const CREATE_LORE_PAGE = gql`
  mutation CreateLorePage(
    $title: String
    $content: String
    $authorId: String!
  ) {
    createLorePage(title: $title, content: $content, authorId: $authorId) {
      title
    }
  }
`;

export default function Admin() {
  // const { loading, error, data } = useQuery(GET_USERS);
  const [createLorePage, { data, loading, error }] =
    useMutation(CREATE_LORE_PAGE);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  // const { handleSubmit, reset, control } = useForm();

  console.log("data", data);
  return (
    <Page>
      <p>This is the admin page!</p>
      <Box
        component="form"
        sx={{
          "& > :not(style)": { m: 2 },
          display: "flex",
          flexDirection: "column",
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
          label="Conent"
          variant="filled"
          color="info"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          multiline
          minRows={3}
        />
        <button
          onClick={async (e) => {
            e.preventDefault();
            try {
              const res = await createLorePage({
                variables: {
                  title,
                  content,
                  authorId: "123",
                },
              });
              console.log("res", res);
            } catch (error) {
              console.log("error:", error);
            }
          }}
        >
          submit.
        </button>
      </Box>
    </Page>
  );
}
