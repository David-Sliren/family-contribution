import { defaultDate } from "@/config/dates";
import { sortByDate } from "@/utils/sorts";

const IMG_DEFAUL = "/family-img/Default.png";

const DEFAUL_DATE = "2026-04-18";

export const USER_CONTRIBUTION_DATA = [
  {
    id: 1,
    userName: "Sandra Andulce",
    relationship: "Hija",
    amount: 50000,
    date: "2026-04-19",
    userState: true,
    userImg: "/family-img/Sandra-andulce.png",
  },
  {
    id: 2,
    userName: "Juan Salazar",
    relationship: "Sobrino",
    amount: 50000,
    date: DEFAUL_DATE,
    userState: true,
    userImg: "/family-img/Juan-salazar.png",
  },

  {
    id: 3,
    userName: "Jose Andulce",
    relationship: "Hijo",
    amount: 150000,
    date: DEFAUL_DATE,
    userState: true,
    userImg: "/family-img/Jose-andulce.png",
  },

  {
    id: 4,
    userName: "Daylon Andulce",
    relationship: "Sobrino",
    amount: 100000,
    date: DEFAUL_DATE,
    userState: true,
    userImg: "/family-img/Daylon-andulce.png",
  },
  {
    id: 5,
    userName: "Libar Alegria",
    relationship: "Hijo",
    amount: 50000,
    date: DEFAUL_DATE,
    userState: true,
    userImg: "/family-img/Libar-alegria.png",
  },
  {
    id: 6,
    userName: "Yobile Alegria",
    relationship: "Hijo",
    amount: 50000,
    date: DEFAUL_DATE,
    userState: true,
    userImg: "/family-img/Yobile-alegria.png",
  },
  {
    id: 7,
    userName: "Seneida",
    relationship: "Hermana",
    amount: 100000,
    date: DEFAUL_DATE,
    userState: true,
    userImg: IMG_DEFAUL,
  },
  {
    id: 8,
    userName: "Jose Luis A.",
    relationship: "Sobrino",
    amount: 50000,
    date: "2026-04-21",
    userState: true,
    userImg: "/family-img/JoseL-andulce.png",
  },
];

export const USER_CONTRIBUTION = sortByDate(USER_CONTRIBUTION_DATA);

export const WALLET = USER_CONTRIBUTION.reduce((a, b) => a + b.amount, 0);
