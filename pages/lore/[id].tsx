import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Stack,
  Typography,
} from "@mui/material";
import { gql, useQuery } from "@apollo/client";

import Page from "../../components/page";
import { useRouter } from "next/router";

const GET_LORE_PAGE = gql`
  query GetLorePage($id: ID!) {
    getLorePage(id: $id) {
      title
      content
      image
    }
  }
`;

export default function Lore() {
  const router = useRouter();
  const { loading, error, data } = useQuery(GET_LORE_PAGE, {
    variables: { id: router.query.id },
  });
  console.log("data", data);
  const lorePage = data?.getLorePage;

  return (
    <Page>
      <Stack>
        <img src={lorePage?.image} style={{ maxWidth: "500px" }} />
        <h1>{lorePage?.title}</h1>
        <h2>{lorePage?.content}</h2>
        <button onClick={() => router.back()}>back to all lore.</button>
      </Stack>
    </Page>
  );
}
