import { FunctionComponent } from "react";
import { Button, Card } from "react-bootstrap";
import { UserInfo } from "../UserModel";
import { UserLocationMap } from "./UserLocationMap";
import "./UserCard.css"

type UserCardProps = {
  user: UserInfo;
  title: string;
  header: string;
  onDelete: () => void;
  onEdit: () => void;
};

export const UserCard: FunctionComponent<UserCardProps> = ({
  user,
  title,
  header,
  onDelete,
  onEdit,
}) => {
  return (
    <Card className="user-card">
      <Card.Header>{header}</Card.Header>
      <Card.Img variant="top" src={user.picture.large} />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>
          User Name: {user.login.username}
          <br />
          Phone: {user.phone}
          <br />
          Gender: {user.gender}
        </Card.Text>
        <Button variant="secondary" onClick={onEdit}>Edit</Button>
        <Button className="float-end" variant="danger" onClick={onDelete}>
          Delete
        </Button>
        {
          user.location && (
            <div className="mt-3" >
              <UserLocationMap latitude={Number(user.location?.coordinates.latitude)} longitude={Number(user.location?.coordinates.longitude)}></UserLocationMap>
            </div>
          )}
      </Card.Body>
    </Card>
  );
};
