import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import { Button, Container, Row, Col,} from 'react-bootstrap';
import { UserInfo } from "./UserModel";
import { ConfirmDeleteModal } from "./Components/ConfirmDeleteModal";
import { Navigation } from "./Components/Navigation";
import { UserCard } from "./Components/UserCard";
import { UserList } from "./Components/UserList";

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

const getUserFullNameWithTitle = (userInfo: UserInfo): string => {
  const {name: { first, last, title }, } = userInfo;
  return `${title} ${first} ${last}`;
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
    return selectedUser ? getUserFullNameWithTitle(selectedUser) : ""
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
            <UserList users={userInfos} onUserSelected={(user) => onUserClicked(user) }></UserList>
          </Col> 
          {
            selectedUser &&     
            <Col sm={4}> 
              <UserCard user={selectedUser} title={getUserFullNameWithTitle(selectedUser)} header={"User Details"} onDelete={confirmUserDelete}></UserCard>
            </Col>
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
