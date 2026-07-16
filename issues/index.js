import transSports from "./trans-sports.js";
import ballot from "./ballot.js";
import policeShootings from "./police-shootings.js";
import schoolShooterFear from "./school-shooter-fear.js";
import migrantCrime from "./migrant-crime.js";
import gasStoves from "./gas-stoves.js";
import antisemitism from "./antisemitism.js";
import cityCrime from "./city-crime.js";

export const ORDER = [
  transSports,
  ballot,
  policeShootings,
  schoolShooterFear,
  migrantCrime,
  gasStoves,
  antisemitism,
  cityCrime
];

export const ISSUES = Object.fromEntries(ORDER.map((issue) => [issue.id, issue]));

// Engine chips shown on issue cards — where the fervor primarily lives.
export const ENGINE_LABELS = {
  right: "fervor: right",
  left: "fervor: left",
  both: "fervor: both"
};
