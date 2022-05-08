import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

const fetchRandomData = async (pageNumber: number) => {
  const randomData = await axios
    .get(`https://randomuser.me/api?page=${pageNumber}`)
    .then(({ data }) => {
      return data;
    })
    .catch((err) => {
      console.error(err);
    });
  return randomData;
};

const getFullUserName = (userInfo: UserInfo): string => {
  const {
    name: { first, last },
  } = userInfo;
  return `${first} ${last}`;
};

interface UserName {
  first: string;
  last: string;
  title: string;
}

interface UserPicture {
  thumbnail: string;
}

interface UserInfo {
  name: UserName;
  picture: UserPicture;
}

export default function App() {
  const [counter, setCounter] = useState(0);
  const [userInfos, setUserInfos] = useState<UserInfo[]>([]);
  const [nextPageNumber, setNextPageNumber] = useState(1);

  const fetchNextUser = async () => {
    const randomData = await fetchRandomData(nextPageNumber);

    if (randomData === undefined) {
      return;
    }
    const newUserInfos: UserInfo[] = [...userInfos, ...randomData.results];

    setUserInfos(newUserInfos);
    setNextPageNumber(randomData.info.page + 1);
  };

  useEffect(() => {
    fetchNextUser();
  }, []);

  return (
    <div className="App">
      <p>{counter}</p>
      <button onClick={() => setCounter(counter + 1)}>Increase Counter</button>
      <button onClick={() => setCounter(0)}>Reset Counter</button>
      <button onClick={() => fetchNextUser()}>Fetch Next User</button>
      {userInfos.map((userInfo: UserInfo, idx: number) => (
        <div key={idx}>
          <p>{getFullUserName(userInfo)}</p>
          <img alt="" src={userInfo.picture.thumbnail}></img>
        </div>
      ))}
    </div>
  );
}
