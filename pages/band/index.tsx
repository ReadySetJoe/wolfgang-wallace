import Image from "next/image";
import styles from "../../styles/band.module.css";
import band from "../../images/band-art-landscape.jpeg";
import dsImg from "../../images/dark-specter-image.jpg";
import joeImg from "../../images/joe-image.jpeg";
import wallyImg from "../../images/wally-image.jpeg";
import { EyePlacements } from "../../utils/eyePlacements";
import Page from "../../components/page";

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

        <iframe
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
                          bottom: "12px",
                          right: "210px",
                        }}
                      >
                        {EyePlacements.BandMember1()}
                      </div>
                    )}
                    {key === "joe" && (
                      <div
                        style={{
                          position: "absolute",
                          top: "50px",
                          right: "170px",
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
