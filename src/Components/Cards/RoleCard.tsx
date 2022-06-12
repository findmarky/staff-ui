import { FunctionComponent } from "react";
import { Card, Button } from "react-bootstrap";
import { Role } from "../../Models/Role";

type RoleCardPros = {
    role: Role;
    onRoleSelected: (role : Role) => void;
  };
  
  export const RoleCard: FunctionComponent<RoleCardPros> = ({ role, onRoleSelected }) => {
    const onCardClick = () => {   
      onRoleSelected(role);
    };
  
    return (
      <Card bg="Light" text={"dark"} onClick={onCardClick}>
        <Card.Header>{role.name}</Card.Header>
        <Card.Body>
          <Card.Text>
            {role.description}
          </Card.Text>
          <Button size="sm" variant="primary">View Users with Role</Button>
        </Card.Body>
      </Card>
    );
  };