import { FunctionComponent, useEffect, useState } from "react";
import { Button, Container, Row, Col } from "react-bootstrap";
import { UserInfo } from "../UserModel";
import { ConfirmDeleteModal } from "../Components/ConfirmDeleteModal";
import { UserList } from "../Components/UserList";
import { UserCard } from "../Components/UserCard";
import "./Users.css";
import { UserForm } from "../Components/UserForm";
import { fetchRandomUserData, defaultUserPageSize, getUserFullName } from "../UserService"

export const Users: FunctionComponent = () => {
  const [userInfos, setUserInfos] = useState<UserInfo[]>([]);
  const [nextPageNumber, setNextPageNumber] = useState(1);
  const [selectedUser, setSelectedUser] = useState<UserInfo | null>(null);
  const [showConfirmDeleteModal, setShowConfirmDeleteModal] = useState(false);
  const [showUserForm, setShowUserForm] = useState(false);
  const [editUser, setEditUser] = useState(false);


  const fetchUsers = async () => {
    const randomData = await fetchRandomUserData(nextPageNumber);
    if (randomData === undefined) {
      return;
    }

    const newUserInfos: UserInfo[] = [...userInfos, ...randomData.results];

    setUserInfos(newUserInfos);
    setNextPageNumber(randomData.info.page + 1);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const onUserClicked = (userInfo: UserInfo) => setSelectedUser(userInfo);

  const onUserDelete = () => setShowConfirmDeleteModal(true);

  const onUserEdit = () => {
    setEditUser(true);
    setShowUserForm(true);
  };

  const onCreateUser = () => {
    setEditUser(false);
    setShowUserForm(true);
  };

  const onSaveUser = (user: UserInfo) => {
    const newUserInfos: UserInfo[] = [...userInfos];
    const existingUser = newUserInfos.find((item) => item.login.uuid === user.login.uuid);

    if (existingUser === undefined) {
      newUserInfos.push(user);
    } else {
      const indexOfUser = userInfos.indexOf(existingUser);
      newUserInfos[indexOfUser] = user;
    }

    setUserInfos(newUserInfos);
    setShowUserForm(false);
  };

  const onCancelSaveUser = () => {
    setShowUserForm(false);
  };

  const onConfirmDeleteModalClose = () => setShowConfirmDeleteModal(false);

  const onConfirmDeleteModalDelete = () => {
    deleteUser(selectedUser!.login.uuid);
    setShowConfirmDeleteModal(false);
  };

  const getSelectedUserName = (): string => {
    return selectedUser ? getUserFullName(selectedUser, true) : "";
  };

  const deleteUser = (uuid: string) => {
    const filteredUserInfos = userInfos.filter(
      (item) => item.login.uuid !== uuid
    );
    setUserInfos(filteredUserInfos);
    setSelectedUser(null);
  };

  return (
    <>
      {showUserForm && (
        <Container>
          <Row className="mt-5">
            <UserForm
              onSave={(user) => onSaveUser(user)}
              onCancel={onCancelSaveUser}
              user={editUser ? selectedUser : null}
            ></UserForm>
          </Row>
        </Container>
      )}
      {!showUserForm && (
        <Container>
          <ConfirmDeleteModal
            show={showConfirmDeleteModal}
            title="Delete User"
            body={`Are you sure you would like to delete ${getSelectedUserName()} ?`}
            onHide={onConfirmDeleteModalClose}
            onClose={onConfirmDeleteModalClose}
            onDelete={onConfirmDeleteModalDelete}
          ></ConfirmDeleteModal>
          <Row className="mt-4">
            <Col sm={9} className="users-list-container">
              <UserList
                users={userInfos}
                onUserSelected={(user) => onUserClicked(user)}
              ></UserList>
            </Col>
            <Col sm={3} className="user-details-card-container">
              <Button className="mb-3" variant="primary" onClick={onCreateUser}>
                Create User
              </Button>
              {selectedUser && (
                <UserCard
                  user={selectedUser}
                  title={getUserFullName(selectedUser, true)}
                  header={"User Details"}
                  onDelete={onUserDelete}
                  onEdit={onUserEdit}
                ></UserCard>
              )}
            </Col>
          </Row>
          <Row>
            <Col sm={2}>
              <Button onClick={() => fetchUsers()} variant="secondary">
                Fetch Next {defaultUserPageSize} Users
              </Button>
            </Col>
          </Row>
        </Container>
      )}
    </>
  );
};
