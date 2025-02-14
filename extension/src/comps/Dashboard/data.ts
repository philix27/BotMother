import type { IPages } from "../../lib/types";

export const DashboardList: {
  title: string;
  icon: string;
  desc?: string;
  screen?: IPages;
}[] = [
  {
    title: "Twitter",
    icon: "skill-icons:twitter",
    desc: "Schedule posts",
    screen: "TWITTER",
  },
  {
    title: "Instagram",
    icon: "skill-icons:instagram",
    desc: "Schedule posts",
    screen: "INSTAGRAM",
  },
  {
    title: "LinkedIn",
    icon: "devicon:linkedin",
    desc: "Schedule posts",
    screen: "LINKEDIN",
  },
];
