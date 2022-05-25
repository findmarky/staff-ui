import { FunctionComponent, ReactElement, useEffect, useRef } from "react";
import { Button, Card } from "react-bootstrap";
import { UserInfo } from "../UserModel";
import "./UserCard.css"
import { Wrapper, Status } from "@googlemaps/react-wrapper";

type UserCardProps = {
  user: UserInfo;
  title: string;
  header: string;
  onDelete: () => void;
  onEdit: () => void;
};

const render = (status: Status): ReactElement => {
  if (status === Status.LOADING) return <h3>{status} ..</h3>;
  if (status === Status.FAILURE) return <h3>{status} ...</h3>;
  return <div></div>;
};

function MyMapComponent({ center, zoom, }: {
  center: google.maps.LatLngLiteral;
  zoom: number;
}) {
  const ref = useRef<any>();

  useEffect(() => {
    new window.google.maps.Map(ref.current, {
      center,
      zoom,
    });
  });

  return <div ref={ref} id="map" />;
}

function GMap() {
  const center = { lat: -34.397, lng: 150.644 };
  const zoom = 4;

  return (
    <Wrapper apiKey="" render={render}>
      <MyMapComponent center={center} zoom={zoom} />
    </Wrapper>
  );
}


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

        <GMap></GMap>



      </Card.Body>
    </Card>
  );
};
