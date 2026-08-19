import ifs from "../assets/logos/ifs.png";
import epic from "../assets/logos/epic.png";
import odoo from "../assets/logos/odoo.png";
import roblox from "../assets/logos/roblox.png";
import unity from "../assets/logos/unity.png";
import seapony from "../assets/logos/seapony.png";
import mbdc from "../assets/logos/mbdc.png";
import veryability from "../assets/logos/veryability.png";
import twist from "../assets/logos/twist.png";

export const logos = {
  ifs,
  epic,
  odoo,
  roblox,
  unity,
  seapony,
  mbdc,
  veryability,
  twist,
} as const;

export type LogoKey = keyof typeof logos;
