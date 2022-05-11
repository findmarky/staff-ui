import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import { Table, Button, Container, Row, Col, Card, Modal, Navbar, Nav, } from 'react-bootstrap';
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
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);

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

  const deleteUser = (uuid: string) => {
    let filteredUserInfos = userInfos.filter(item => item.login.uuid !== uuid);
    setUserInfos(filteredUserInfos);
    setSelectedUser(null);
  };

  const showConfirmDeleteUserModal = () => {
    setShowDeleteAlert(true);
  };

  function DeleteModal() {
    const handleClose = () => setShowDeleteAlert(false);

    const handleDelete = () => {
      deleteUser(selectedUser!.login.uuid);
      setShowDeleteAlert(false);
    };

    const getUserName = (): string => {
      return selectedUser ? getFullUserName(selectedUser) : ""
    };

    return (
      <>
        <Modal
          show={showDeleteAlert}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
          aria-labelledby="contained-modal-title-vcenter"
          centered>
          <Modal.Header closeButton>
            <Modal.Title>Delete User</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Are you sure you would like to delete {getUserName()} ?
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="danger" onClick={handleDelete}>Delete</Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }

  return (
    <>

      <Navbar bg="dark" expand="lg" variant="dark" sticky="top">
        <Container>
          <Navbar.Brand href="#home">Application</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#users">Users</Nav.Link>
              <Nav.Link href="#other">Other</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container>
        <DeleteModal></DeleteModal>
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
                <Card.Header>User Details</Card.Header>
                <Card.Img variant="top" src={selectedUser.picture.large} />
                <Card.Body>
                  <Card.Title>{getFullUserName(selectedUser, true)}</Card.Title>
                  <Card.Text>
                    User Name: {selectedUser.login.username}<br />
                    Phone: {selectedUser.phone}<br />
                    Gender: {selectedUser.gender}
                  </Card.Text>
                  <Button variant="secondary">Something</Button>
                  <Button className="float-end" variant="danger" onClick={() => showConfirmDeleteUserModal()}>Delete</Button>
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
    </>
  );
}
