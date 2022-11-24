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

const GET_LORE_PAGES = gql`
  query GetLorePages {
    getLorePages {
      id
      title
      content
      image
    }
  }
`;

export default function Lore() {
  const { data } = useQuery(GET_LORE_PAGES);
  const lorePages = data?.getLorePages ?? [];

  return (
    <Page>
      <Stack>
        <h1>Lore.</h1>
        <h4>
          Welcome to our weird little corner of the internet. This is where we
          share the story of our songs, and invite you to share in the
          narrative.
        </h4>
        <h2>Welcome to the weird world of wolfgang wallace.</h2>
      </Stack>
      <Stack>
        <h2>Recently Updated:</h2>
        <div style={{ display: "flex", overflowX: "auto" }}>
          {lorePages.map(({ id, title, content, image }) => (
            <a href={`/lore/${id}`}>
              <Card raised sx={{ width: 300, margin: "1rem" }}>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="300"
                    image={image}
                    alt={title}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {title || "TITLE_NOT_FOUND"}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      whiteSpace="nowrap"
                      textOverflow="ellipsis"
                      overflow="hidden"
                    >
                      {content || "WORDS_NOT_FOUND"}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </a>
          ))}
        </div>
      </Stack>
    </Page>
  );
}
