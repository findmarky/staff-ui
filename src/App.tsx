import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import { Table, Button } from 'react-bootstrap';

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

interface Login {
  uuid: string;
  username: string;
}

interface UserInfo {
  name: UserName;
  login: Login;
  email: string;
  phone: string;
  gender: string;
  picture: UserPicture;
}

export default function App() {
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
      <Table striped hover variant="dark">
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {userInfos.map((userInfo: UserInfo) => (
            <tr key={userInfo.login.uuid}>
              <td>
                <img alt="" src={userInfo.picture.thumbnail}></img>
              </td>
              <td>{getFullUserName(userInfo)}</td>
              <td>{userInfo.email}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Button onClick={() => fetchNextUser()} variant="dark">Fetch Next User</Button>
    </div>
  );
}
