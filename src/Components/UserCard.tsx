import { FunctionComponent } from "react";
import { Button, Card, Col } from "react-bootstrap";
import { UserInfo } from "../UserModel";

type UserCardProps = {
    user : UserInfo;
    title: string;
    header: string;
    onDelete: () => void;
}

export const UserCard : FunctionComponent<UserCardProps> = ({user, title, header, onDelete}) => {
    return (
        <Col sm={4}>
        <Card style={{ width: '18rem' }} bg='dark' text='white'>
        <Card.Header>{header}</Card.Header>
        <Card.Img variant="top" src={user.picture.large} />
        <Card.Body>
            <Card.Title>{title}</Card.Title>
            <Card.Text>
            User Name: {user.login.username}<br />
            Phone: {user.phone}<br />
            Gender: {user.gender}
            </Card.Text>
            <Button variant="secondary">Something</Button>
            <Button className="float-end" variant="danger" onClick={onDelete}>Delete</Button>
        </Card.Body>
        </Card>
    </Col>
    );
}; 