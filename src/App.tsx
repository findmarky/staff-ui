import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import { Table, Button, Container, Row, Col, Card, ButtonGroup } from 'react-bootstrap';
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

const getFullUserName = (userInfo: UserInfo, includeTitle: boolean = false): string => {
  const {
    name: { first, last, title },
  } = userInfo;
  return includeTitle ? `${title} ${first} ${last}` : `${first} ${last}`;
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
          <Col sm={4}>
            <Card style={{ width: '18rem' }} bg='dark' text='white'>
              <Card.Header>Details</Card.Header>
              <Card.Img variant="top" src={selectedUser.picture.large} />
              <Card.Body>
                <Card.Title>{getFullUserName(selectedUser, true)}</Card.Title>
                <Card.Text>
                  Phone: {selectedUser.phone}<br />
                  Gender: {selectedUser.gender}<br />
                  User Name: {selectedUser.login.username}
                </Card.Text>
                <ButtonGroup size="sm">
                  <Button variant="secondary">Something</Button>
                  <Button variant="danger">Delete</Button>
                </ButtonGroup>
              </Card.Body>
            </Card>
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
