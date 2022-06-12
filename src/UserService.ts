import axios from "axios";
import { UserInfo } from "./Models/UserModel";

export const defaultUserPageSize: number = 10;

export const fetchRandomUserData = async (pageNumber: number = 1, pageSize: number = defaultUserPageSize) => {
  const randomData = await axios
    .get(`https://randomuser.me/api?results=${pageSize}&page=${pageNumber}`)
    .then(({ data }) => {
      return data;
    })
    .catch((err) => {
      console.error(err);
    });

  return randomData;
};

export const getUserFullName = (userInfo: UserInfo, includeTitle : boolean = false): string => {
  const { name: { first, last, title }, } = userInfo;

  return includeTitle 
    ? `${title} ${first} ${last}` 
    : `${first} ${last}`;
};