import type { IconType } from "react-icons";
import {
  SiApachecouchdb,
  SiAxios,
  SiFacebook,
  SiGit,
  SiInstagram,
  SiMysql,
  SiNodedotjs,
  SiNpm,
  SiTailwindcss,
  SiTiktok,
  SiVuedotjs,
} from "react-icons/si";
import { TbApi, TbBrandLinkedin, TbSql } from "react-icons/tb";

export const iconMap: Record<string, IconType> = {
  SiVuedotjs,
  SiAxios,
  SiTailwindcss,
  SiNodedotjs,
  TbApi,
  SiMysql,
  TbSql,
  SiApachecouchdb,
  SiGit,
  SiNpm,
  SiFacebook,
  SiInstagram,
  SiTiktok,
  TbBrandLinkedin,
};

export function getIcon(name: string): IconType | null {
  return iconMap[name] ?? null;
}
