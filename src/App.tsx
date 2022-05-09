import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import { Table, Button, Container, Row, Col } from 'react-bootstrap';
import { UserInfo } from "./UserModel";

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

export default function App() {
  const [userInfos, setUserInfos] = useState<UserInfo[]>([]);
  const [nextPageNumber, setNextPageNumber] = useState(1);
  const [selectedUser, setSelectedUser] = useState<UserInfo | null>(null);

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

  const onUserClicked = (userInfo: UserInfo) => {
    console.log(`Clicked ${userInfo.email}`)
    setSelectedUser(userInfo);
  }

  return (
    <Container>
      <Row className='mt-5'>
        <Col sm={8}>
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
                <tr key={userInfo.login.uuid} onClick={() => onUserClicked(userInfo)}>
                  <td>
                    <img alt="" src={userInfo.picture.thumbnail}></img>
                  </td>
                  <td>{getFullUserName(userInfo)}</td>
                  <td>{userInfo.email}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
        {selectedUser &&
          <Col sm={4}>User Details
            <ul>
              <li>User Name: {selectedUser.login.username}</li>
              <li>Phone: {selectedUser.phone}</li>
              <li>Gender: {selectedUser.gender}</li>
            </ul>
          </Col>
        }
      </Row>
      <Row>
        <Col sm={8}>
          <Button onClick={() => fetchNextUser()} variant="dark">Fetch Next User</Button></Col>
      </Row>
    </Container>
  );
}
