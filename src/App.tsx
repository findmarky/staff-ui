import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import { Table, Button, Container, Row, Col,} from 'react-bootstrap';
import { UserInfo } from "./UserModel";
import { ConfirmDeleteModal } from "./Components/ConfirmDeleteModal";
import { Navigation } from "./Components/Navigation";
import { UserCard } from "./Components/UserCard";

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
  const [showConfirmDeleteModal, setShowConfirmDeleteModal] = useState(false);

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

  const onUserClicked = (userInfo: UserInfo) => setSelectedUser(userInfo); 

  const deleteUser = (uuid: string) => {
    let filteredUserInfos = userInfos.filter(item => item.login.uuid !== uuid);
    setUserInfos(filteredUserInfos);
    setSelectedUser(null);
  };

  const confirmUserDelete = () => setShowConfirmDeleteModal(true);
  const handleConfirmDeleteModalClose = () => setShowConfirmDeleteModal(false);

  const handleConfirmDeleteModalDelete = () => {
    deleteUser(selectedUser!.login.uuid);
    setShowConfirmDeleteModal(false);
  };

  const getSelectedUserName = (): string => {
    return selectedUser ? getFullUserName(selectedUser) : ""
  };

  return (
    <>
      <Navigation></Navigation>
      <Container>
        <ConfirmDeleteModal 
            show={showConfirmDeleteModal}
            title="Delete User" 
            body={`Are you sure you would like to delete ${getSelectedUserName()} ?`} 
            onHide={handleConfirmDeleteModalClose} 
            onClose={handleConfirmDeleteModalClose} 
            onDelete={handleConfirmDeleteModalDelete}>          
        </ConfirmDeleteModal>
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
          {
            selectedUser && <UserCard user={selectedUser} title={getFullUserName(selectedUser, true)} header={"User Details"} onDelete={confirmUserDelete}></UserCard>
          }
        </Row>
        <Row>
          <Col sm={8}>
            <Button onClick={() => fetchNextUser()} variant="dark">Fetch Next User</Button>
          </Col>
        </Row>
      </Container>
    </>
  );
}
