import React from "react";
import CollectibleEye from "../components/CollectibleEye";

// Helper component to easily place eyes with consistent props
export const EyePlacements = {
  // Homepage eyes (3)
  HomeFooter: () => (
    <CollectibleEye eyeId="home-footer" hint="At the end of the beginning" />
  ),
  HomeAlbumCorner: () => (
    <CollectibleEye
      eyeId="home-album"
      hint="Hidden within the corners of a dark triad"
      hidden
    />
  ),
  HomeTitle: () => (
    <CollectibleEye
      eyeId="home-title"
      hint="Landing near home, we introduce ourselves"
    />
  ),

  // Band page eyes (4)
  BandMember1: () => (
    <CollectibleEye
      eyeId="band-member-1"
      hint="The first member holds a secret"
    />
  ),
  BandMember2: () => (
    <CollectibleEye eyeId="band-member-2" hint="The second member blossoms" />
  ),
  BandMember3: () => (
    <CollectibleEye
      eyeId="band-member-3"
      hint="The third member sees through the mist"
    />
  ),
  BandBio: () => (
    <CollectibleEye
      eyeId="band-bio"
      hint="Having had the pleasure of introductions, seek a warning near the end"
      hidden
    />
  ),

  // Lore page eyes (4)
  LoreChapter1: () => (
    <CollectibleEye
      eyeId="lore-ch1"
      hint="Visions of grandeur and conquest"
      hidden
    />
  ),
  LoreChapter2: () => (
    <CollectibleEye eyeId="lore-ch2" hint="Our hero's introduction" hidden />
  ),
  LoreSecret: () => (
    <CollectibleEye eyeId="lore-secret" hint="At the end of our story" hidden />
  ),
  LoreEnd: () => (
    <CollectibleEye
      eyeId="lore-end"
      hint="The final lesson, a moral for the damned"
    />
  ),

  // Mystery page eyes (4)
  MysteryIntro: () => (
    <CollectibleEye eyeId="mystery-intro" hint="Where your mystery began" />
  ),
  MysteryClue: () => (
    <CollectibleEye
      eyeId="mystery-clue"
      hint="Shrouded in darkness, northeast towards salvation"
      hidden
    />
  ),
  MysteryPuzzle: () => (
    <CollectibleEye eyeId="mystery-puzzle" hint="The riddle ends" hidden />
  ),
  MysteryReveal: () => (
    <CollectibleEye eyeId="mystery-reveal" hint="The truth revealed" />
  ),

  // RPG page eyes (3)
  RpgCharacter: () => (
    <CollectibleEye
      eyeId="rpg-char"
      hint="Let your true character show"
      hidden
    />
  ),
  RpgQuest: () => (
    <CollectibleEye
      eyeId="rpg-quest"
      hint="All good heroes deserve a reward for beginning their quest"
    />
  ),
  RpgSecret: () => (
    <CollectibleEye
      eyeId="rpg-secret"
      hint="Resting below a hand crafted tale"
      hidden
    />
  ),

  // Hidden/Special eyes (2)
  Error404: () => (
    <CollectibleEye eyeId="404-eye" hint="On a path with no resolution" />
  ),
  KonamiReward: () => (
    <CollectibleEye
      eyeId="konami-eye"
      hint="The final eye. Do you know the code? The keys are the key, contra-ry to popular belief. Best of luck"
    />
  ),
};

// Export individual eye IDs and hints for reference
export const EYE_DATA = [
  { id: "home-footer", hint: "At the end of the beginning" },
  { id: "home-album", hint: "Hidden within the corners of a dark triad" },
  { id: "home-title", hint: "Landing near home, we introduce ourselves" },
  { id: "band-member-1", hint: "The first member holds a secret" },
  { id: "band-member-2", hint: "The second member blossoms" },
  { id: "band-member-3", hint: "The third member sees through the mist" },
  {
    id: "band-bio",
    hint: "Having had the pleasure of introductions, seek a warning near the end",
  },
  { id: "lore-ch1", hint: "Visions of grandeur and conquest" },
  { id: "lore-ch2", hint: "Our hero's introduction" },
  { id: "lore-secret", hint: "Between the lines" },
  { id: "lore-end", hint: "The final lesson, a moral for the damned" },
  { id: "mystery-intro", hint: "Where your mystery began" },
  {
    id: "mystery-clue",
    hint: "Shrouded in darkness, northeast towards salvation",
  },
  { id: "mystery-puzzle", hint: "The riddle ends" },
  { id: "mystery-reveal", hint: "The truth revealed" },
  { id: "rpg-char", hint: "Let your true character show" },
  {
    id: "rpg-quest",
    hint: "All good heroes deserve a reward for beginning their quest",
  },
  { id: "rpg-secret", hint: "Resting below a hand crafted tale" },
  { id: "404-eye", hint: "On a path with no resolution" },
  {
    id: "konami-eye",
    hint: "The final eye. Do you know the code? The keys are the key, contra-ry to popular belief. Best of luck",
  },
];

export const EYE_IDS = EYE_DATA.map((eye) => eye.id);
