import React, { useState, useEffect } from "react";
import Page from "../../components/page";
import styles from "../../styles/lore.module.css";

interface Song {
  title: string;
  lyrics: string;
}

export default function Lore() {
  const [songs, setSongs] = useState<Song[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSong, setSelectedSong] = useState<string | null>(null);

  const songFiles = [
    { file: "bankrupt.txt", title: "Bankrupt" },
    { file: "comatose.txt", title: "Comatose" },
    { file: "compulsory-evacuation-device.txt", title: "Compulsory Evacuation Device" },
    { file: "consequences.txt", title: "Consequences" },
    { file: "dance-macabre.txt", title: "Dance Macabre" },
    { file: "harbor.txt", title: "Harbor" },
    { file: "keep-out.txt", title: "Keep Out" },
    { file: "napoleon.txt", title: "Napoleon" },
    { file: "smile-wide.txt", title: "Smile Wide" },
    { file: "tarot.txt", title: "Tarot" },
    { file: "the-long-con.txt", title: "The Long Con" }
  ];

  useEffect(() => {
    const loadSongs = async () => {
      try {
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
        <h3 className={styles.loreIntro}>
          Welcome to our weird little corner of the internet. This is where we
          share the story of our songs, and invite you to share in the
          narrative.
        </h3>

        <h1 className={styles.loreTitle}>The Lore.</h1>

        <div className={styles.wipNotice}>
          <p>🚧 <strong>Work in Progress</strong> 🚧</p>
          <p>We're currently crafting the full narrative experience that connects all our songs. 
             In the meantime, explore our lyrics below and piece together the mystery yourself...</p>
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
                    onClick={() => setSelectedSong(
                      selectedSong === song.title ? null : song.title
                    )}
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
                      .find(song => song.title === selectedSong)
                      ?.lyrics.split('\n')
                      .map((line, index) => (
                        <p key={index}>{line || '\u00A0'}</p>
                      ))
                    }
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
