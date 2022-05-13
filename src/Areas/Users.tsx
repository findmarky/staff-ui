import { FunctionComponent, useEffect, useState } from "react";
import axios from "axios";
import { Button, Container, Row, Col } from "react-bootstrap";
import { UserInfo } from "../UserModel";
import { ConfirmDeleteModal } from "../Components/ConfirmDeleteModal";
import { UserList } from "../Components/UserList";
import { UserCard } from "../Components/UserCard";
import "./Users.css";

const userPageSize: number = 10;

const fetchRandomUserData = async (pageNumber: number) => {
  const randomData = await axios
    .get(`https://randomuser.me/api?results=${userPageSize}&page=${pageNumber}`)
    .then(({ data }) => {
      return data;
    })
    .catch((err) => {
      console.error(err);
    });
  return randomData;
};

const getUserFullNameWithTitle = (userInfo: UserInfo): string => {
  const {
    name: { first, last, title },
  } = userInfo;
  return `${title} ${first} ${last}`;
};

export const Users: FunctionComponent = () => {
  const [userInfos, setUserInfos] = useState<UserInfo[]>([]);
  const [nextPageNumber, setNextPageNumber] = useState(1);
  const [selectedUser, setSelectedUser] = useState<UserInfo | null>(null);
  const [showConfirmDeleteModal, setShowConfirmDeleteModal] = useState(false);

  const fetchNextUser = async () => {
    const randomData = await fetchRandomUserData(nextPageNumber);
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

  const onUserDelete = () => setShowConfirmDeleteModal(true);

  const onUserEdit = () => {
    console.log(`Edit user ${selectedUser?.email}`);
  };

  const onCreateUser = () => {
    console.log(`Create user`);
  };

  const onConfirmDeleteModalClose = () => setShowConfirmDeleteModal(false);

  const onConfirmDeleteModalDelete = () => {
    deleteUser(selectedUser!.login.uuid);
    setShowConfirmDeleteModal(false);
  };

  const getSelectedUserName = (): string => {
    return selectedUser ? getUserFullNameWithTitle(selectedUser) : "";
  };

  const deleteUser = (uuid: string) => {
    let filteredUserInfos = userInfos.filter(
      (item) => item.login.uuid !== uuid
    );
    setUserInfos(filteredUserInfos);
    setSelectedUser(null);
  };

  return (
    <>
      <Container>
        <ConfirmDeleteModal
          show={showConfirmDeleteModal}
          title="Delete User"
          body={`Are you sure you would like to delete ${getSelectedUserName()} ?`}
          onHide={onConfirmDeleteModalClose}
          onClose={onConfirmDeleteModalClose}
          onDelete={onConfirmDeleteModalDelete}
        ></ConfirmDeleteModal>
        <Row className="mt-5">
          <Col sm={8} className="users-list-container">
            <UserList
              users={userInfos}
              onUserSelected={(user) => onUserClicked(user)}
            ></UserList>
          </Col>
          <Col sm={4} className="user-details-card-container">
            <Button style={{ marginLeft: "180px", marginBottom: "10px" }} variant="primary" onClick={onCreateUser}>
                Create User
            </Button>
            {selectedUser && (
              <UserCard
                user={selectedUser}
                title={getUserFullNameWithTitle(selectedUser)}
                header={"User Details"}
                onDelete={onUserDelete}
                onEdit={onUserEdit}
              ></UserCard>
            )}
          </Col>
        </Row>
        <Row>
          <Col sm={8}>
            <Button onClick={() => fetchNextUser()} variant="secondary">
              Fetch Next {userPageSize} Users
            </Button>
          </Col>
        </Row>
      </Container>
    </>
  );
};
