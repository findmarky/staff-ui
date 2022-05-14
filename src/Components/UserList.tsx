import { FunctionComponent } from "react";
import { Table } from "react-bootstrap";
import { UserInfo } from "../UserModel";
import "./UserList.css"

type UserListProps = {
  users: UserInfo[];
  onUserSelected: (user: UserInfo) => void;
};

export const UserList: FunctionComponent<UserListProps> = ({users, onUserSelected,}) => {
    
  const getUserFullName = (userInfo: UserInfo): string => {
    const {name: { first, last }, } = userInfo;
    return `${first} ${last}`;
  };

  return (
    <Table hover>
      <thead className="user-list-table-header">
        <tr>
          <th>Image</th>
          <th>Name</th>
          <th>Email</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user: UserInfo) => (
          <tr key={user.login.uuid} onClick={() => onUserSelected(user)}>
            <td>
              <img alt="" src={user.picture.thumbnail}></img>
            </td>
            <td>{getUserFullName(user)}</td>
            <td>{user.email}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};
