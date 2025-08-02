import Image from "next/image";
import styles from "../../styles/band.module.css";
import band from "../../images/band-art-landscape.jpeg";
import dsImg from "../../images/dark-specter-image.jpg";
import joeImg from "../../images/joe-image.jpeg";
import wallyImg from "../../images/wally-image.jpeg";
import { EyePlacements } from "../../utils/eyePlacements";
import Page from "../../components/Page";

const MEMBER_BIOS = {
  wally: {
    name: "Wally",
    title: "The Phantom Pilot",
    position: "Songwriter, Lead Vocals, Rhythm Guitar",
    bio: "Once soared through clouds at 30,000 feet until faulty parts sent him spiraling into the void. Now he channels the voices of the crashed and forgotten, weaving their stories into haunting melodies. Some say his guitar strings are made from twisted aircraft cables.",
    image: wallyImg,
    status: "Missing in Action",
  },
  joe: {
    name: "Joe",
    title: "The Silver-Tongued Sinner",
    position: "Lead Guitar, Harmony Vocals",
    bio: "A reformed con artist whose silver tongue once sold salvation to the desperate. His guitar solos echo with the screams of those he betrayed. Legend has it he made a deal at the crossroads, but forgot to read the fine print.",
    image: joeImg,
    status: "Wanted by Multiple Agencies",
  },
  austin: {
    name: "Austin",
    title: "The Harbor Keeper",
    position: "Bass Guitar",
    bio: "Found washed ashore with no memory of his past, clutching a bass guitar that hums with otherworldly frequencies. His deep notes anchor the band's sound to this realm, preventing them from drifting completely into the void.",
    image: null,
    status: "Identity Unknown",
  },
  shane: {
    name: "Shane",
    title: "The Rhythm Reaper",
    position: "Drums, Percussion",
    bio: "Beats the drums with bones he claims belonged to his enemies. Each strike echoes through dimensions, summoning spirits to dance macabre. His tempo controls the heartbeat of the damned.",
    image: null,
    status: "Presumed Deceased",
  },
  ds: {
    name: "The Dark Specter",
    title: "The Void Whisperer",
    position: "Visual Artist, Supernatural Consultant",
    bio: "Neither fully alive nor truly dead, this entity emerged from the convergence of Powers and Wallace. It sees through the veil between worlds and captures visions that mortal eyes were never meant to witness.",
    image: dsImg,
    status: "Transcendent",
  },
};

export default function Band() {
  return (
    <Page>
      <div className={styles.bandContainer}>
        <div className={styles.bandHeader}>
          <h1 className={styles.bandTitle}>The Band.</h1>
        </div>

        <div className={styles.bandImageContainer}>
          <Image
            src={band}
            alt="Wolfgang Wallace - Artist's Rendering (NOT a police sketch)"
            className={styles.bandImage}
            sizes="(max-width: 768px) 100vw, 800px"
          />
          <div className={styles.imageCaption}>
            Artist's rendering. Definitely NOT a police sketch. We swear.
          </div>
        </div>

        {/* <iframe
          style={{
            borderRadius: "12px",
            marginBottom: "20px",
            maxWidth: "800px",
          }}
          src="https://open.spotify.com/embed/artist/4m3Bhxg7otGtBF7xsfTQTV?utm_source=generator&theme=0"
          width="100%"
          height="352"
          frameBorder="0"
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
        ></iframe> */}
        <div
          className={styles.spotifyLinkContainer}
          style={{ margin: "24px 0", textAlign: "center" }}
        >
          <a
            href="https://open.spotify.com/artist/4m3Bhxg7otGtBF7xsfTQTV?si=mIoj9Yj6SBGZKvQVrIoXpA"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.spotifyLink}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              background: "#1DB954",
              color: "#fff",
              padding: "12px 24px",
              borderRadius: "24px",
              fontWeight: 600,
              textDecoration: "none",
              fontSize: "1.1rem",
              boxShadow: "0 2px 8px rgba(30,185,84,0.15)",
              transition: "background 0.2s",
            }}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 168 168"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="84" cy="84" r="84" fill="#1ED760" />
              <path
                d="M120.1 116.3c-1.7 2.8-5.3 3.7-8.1 2-22.2-13.6-50.2-16.7-83.2-9.2-3.2.7-6.4-1.3-7.1-4.5-.7-3.2 1.3-6.4 4.5-7.1 35.3-7.9 65.2-4.4 89.2 10.5 2.8 1.7 3.7 5.3 2 8.1zm11.6-23.5c-2.1 3.4-6.5 4.5-9.9 2.4-25.5-15.7-64.5-20.2-94.7-11.1-3.8 1.1-7.8-1.1-8.9-4.9-1.1-3.8 1.1-7.8 4.9-8.9 33.9-9.9 76.2-5 104.6 12.3 3.4 2.1 4.5 6.5 2.4 9.9zm.9-25.2C98.6 53.5 54.7 52.2 31.7 58.7c-4.3 1.2-8.7-1.2-9.9-5.5-1.2-4.3 1.2-8.7 5.5-9.9 26.2-7.2 74.1-5.7 104.7 13.2 4 2.4 5.3 7.6 2.9 11.6-2.4 4-7.6 5.3-11.6 2.9z"
                fill="#fff"
              />
            </svg>
            Listen on Spotify
          </a>
        </div>

        <iframe
          style={{
            borderRadius: "12px",
            marginBottom: "20px",
            maxWidth: "800px",
          }}
          width="100%"
          height="320"
          src="https://www.youtube.com/embed/o2droJZTYYw?si=aPDvOtLP1IF7beru"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>

        <div className={styles.membersGrid}>
          {Object.entries(MEMBER_BIOS).map(([key, member]) => (
            <div key={key} className={styles.memberCard}>
              <div className={styles.memberImageContainer}>
                {member.image ? (
                  <div style={{ position: "relative" }}>
                    <Image
                      src={member.image}
                      alt={member.name}
                      className={styles.memberImage}
                      width={400}
                      height={400}
                    ></Image>
                    {key === "wally" && (
                      <div
                        style={{
                          position: "absolute",
                          bottom: "3%",
                          right: "46%",
                        }}
                      >
                        {EyePlacements.BandMember1()}
                      </div>
                    )}
                    {key === "joe" && (
                      <div
                        style={{
                          position: "absolute",
                          top: "40%",
                          right: "61%",
                        }}
                      >
                        {EyePlacements.BandMember2()}
                      </div>
                    )}
                  </div>
                ) : (
                  <div className={styles.memberImagePlaceholder}>
                    <div className={styles.placeholderText}>
                      IDENTITY
                      <br />
                      CLASSIFIED
                    </div>
                  </div>
                )}
              </div>

              <div className={styles.memberInfo}>
                <h3 className={styles.memberName}>{member.name}</h3>
                <p className={styles.memberPosition}>{member.position}</p>
                <div className={styles.memberBio}>
                  {key === "austin" && (
                    <div
                      style={{
                        opacity: 0.2,
                        position: "absolute",
                        bottom: "10px",
                        right: "10px",
                      }}
                    >
                      {EyePlacements.BandMember3()}
                    </div>
                  )}
                  <p>{member.bio}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.disclaimer}>
          <p>
            <strong>Disclaimer:</strong> Any resemblance to actual persons,
            living or dead, is purely coincidental. The band members depicted
            are fictional characters created for artistic purposes. No actual
            aircraft were harmed in the making of this mythology.
            <span style={{ marginLeft: "10px", opacity: 0.3 }}>
              {EyePlacements.BandBio()}
            </span>
          </p>
        </div>
      </div>
    </Page>
  );
}
