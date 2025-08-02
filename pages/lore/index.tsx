import React, { useState, useEffect } from "react";
import Page from "../../components/page";
import styles from "../../styles/lore.module.css";
import { EyePlacements } from "../../utils/eyePlacements";

interface Song {
  title: string;
  lyrics: string;
}

export default function Lore() {
  const [songs, setSongs] = useState<Song[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSong, setSelectedSong] = useState<string | null>(null);

  useEffect(() => {
    const loadSongs = async () => {
      try {
        const songFiles = [
          { file: "bankrupt.txt", title: "Bankrupt" },
          { file: "comatose.txt", title: "Comatose" },
          {
            file: "compulsory-evacuation-device.txt",
            title: "Compulsory Evacuation Device",
          },
          { file: "consequences.txt", title: "Consequences" },
          { file: "dance-macabre.txt", title: "The Dance Macabre" },
          { file: "harbor.txt", title: "Harbor" },
          { file: "keep-out.txt", title: "Keep Out" },
          { file: "napoleon.txt", title: "Napoleon" },
          { file: "smile-wide.txt", title: "Smile Wide" },
          { file: "tarot.txt", title: "Tarot Arcana XVI: The Tower" },
          { file: "the-long-con.txt", title: "The Long Con" },
        ];
        const songPromises = songFiles.map(async ({ file, title }) => {
          const response = await fetch(`/assets/${file}`);
          const lyrics = await response.text();
          return { title, lyrics };
        });

        const loadedSongs = await Promise.all(songPromises);
        setSongs(loadedSongs);
        setLoading(false);
      } catch (error) {
        console.error("Failed to load songs:", error);
        setLoading(false);
      }
    };

    loadSongs();
  }, []);

  return (
    <Page>
      <div className={styles.loreContainer}>
        <h1 className={styles.loreTitle}>The Lore.</h1>

        <div className={styles.vintagePaperContainer}>
          <div className={styles.vintagePaper}>
            <div className={styles.paperTexture}></div>
            <div className={styles.paperGradient}></div>
            <div className={styles.paperContent}>
              <h3>Act I: J. Powers</h3>
              <p>
                Our tale begins with J. Powers, a man consumed by his own mind (
                <em style={{ position: "relative" }}>
                  <div
                    style={{
                      position: "absolute",
                      top: "-20px",
                      left: "25px",
                    }}
                  >
                    {EyePlacements.LoreChapter1()}
                  </div>
                  Napoleon
                </em>
                ). Lost in fantasies of grandeur and immortality, he escapes
                into delusions where he is revered as a god. But beneath the
                facade lies a broken soul - a narcissist, a liar, desperate to
                blame his failings on anything but himself.
              </p>

              <p>
                Enter the femme fatale. She sees his silver tongue and offers
                him a new life as a conman (<em>The Long Con</em>). Together
                they become a modern Bonnie and Clyde, running schemes and
                stealing identities. Their cons grow more elaborate and
                dangerous - Powers begins selling faulty aircraft parts to
                defense contractors like Lockheed Martin, prioritizing profit
                over safety.
              </p>

              <p>
                The inevitable comes to pass. His house of cards collapses (
                <em>Smile Wide</em>, <em>Keep Out</em>), and J. Powers finds
                himself at the bank, making his final statement (
                <em>Bankrupt</em>). The vault door closes, sealing away not just
                his assets, but his last shred of dignity. In desperation, he
                turns to the occult (<em>Tarot Arcana XVI: The Tower</em>),
                consulting cards and spirits for supernatural solutions to his
                earthly problems.
              </p>

              <h3>
                Act II: Wolfgang Wallace
                {EyePlacements.LoreChapter2()}
              </h3>
              <p>
                Enter Wolfgang Wallace, a skilled pilot whose fate becomes
                tragically intertwined with Powers' crimes. Flying a Lockheed
                Martin aircraft equipped with J. Powers' faulty parts, Wolfgang
                suddenly finds himself in mortal danger (
                <em>Compulsory Evacuation Device</em>). The defective components
                fail at the worst possible moment, sending his aircraft
                spiraling toward disaster.
              </p>

              <p>
                Wolfgang survives the crash, but barely. He slips into a
                comatose state (<em>Comatose</em>) and is ultimately brought
                back, but has become more machine than man, (
                <em>Automatic Mannequin</em>) suspended between life and death.
                When he finally awakens, he's no longer the man he once was -
                transformed by trauma and loss, driven by a singular purpose: to
                find the man responsible for his suffering.
              </p>

              <h3>Act III: The Dance Macabre</h3>
              <p>
                Wolfgang's investigation leads him to the harbor (
                <em>Harbor</em>), where in his rage and desperation, he
                accidentally kills his own beloved. Consumed by guilt and fury,
                he tracks down J. Powers to face the consequences of his actions
                (<em>Consequences</em>).
              </p>

              <p>
                But Wolfgang's plan is darker than simple revenge. On Día de los
                Muertos, he performs a bloodstained ritual (
                <em>The Dance Macabre</em>), using J. Powers as a sacrifice in
                an occult ritual to resurrect his lost love. The ritual
                succeeds, but at a terrible cost - both men are transformed in
                the process, merging into something else entirely: The Dark
                Specter. Neither alive nor dead, they exist in the void between
                worlds, forever bound by the consequences of greed, revenge, and
                forbidden love.
                <br />
                <span style={{ opacity: 0.5, marginLeft: "5px" }}>
                  {EyePlacements.LoreSecret()}
                </span>
              </p>

              <p className={styles.epilogue}>
                <em>
                  "Was it worth it?" she asked.
                  <br />
                  "For you, of course it is." {EyePlacements.LoreEnd()}
                </em>
              </p>
            </div>
          </div>
        </div>

        <div className={styles.lyricsSection}>
          <h2>Song Lyrics:</h2>

          {loading ? (
            <p className={styles.loading}>Loading songs...</p>
          ) : (
            <>
              <div className={styles.songGrid}>
                {songs.map((song, index) => (
                  <button
                    key={index}
                    className={`${styles.songButton} ${
                      selectedSong === song.title ? styles.selected : ""
                    }`}
                    onClick={() =>
                      setSelectedSong(
                        selectedSong === song.title ? null : song.title
                      )
                    }
                  >
                    {song.title}
                  </button>
                ))}
              </div>

              {selectedSong && (
                <div className={styles.lyricsDisplay}>
                  <h3>{selectedSong}</h3>
                  <div className={styles.lyricsText}>
                    {songs
                      .find((song) => song.title === selectedSong)
                      ?.lyrics.split("\n")
                      .map((line, index) => (
                        <p key={index}>{line || "\u00A0"}</p>
                      ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </Page>
  );
}
