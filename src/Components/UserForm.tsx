import { FunctionComponent, useState } from "react";
import { Button, Col, Form, InputGroup, Row } from "react-bootstrap";
import { Picture, UserInfo } from "../UserModel";
import "./UserForm.css";
import { v4 as uuidv4 } from "uuid";

type UserFormProps = {
  onSave: (user: UserInfo) => void;
  onCancel: () => void;
  user?: UserInfo | null;
};

export const UserForm: FunctionComponent<UserFormProps> = ({
  onSave,
  onCancel,
  user,
}) => {
  const [validated, setValidated] = useState(false);

  const [title, setTitle] = useState(user?.name?.title ?? "");
  const [firstName, setFirstName] = useState(user?.name?.first ?? "");
  const [lastName, setLastName] = useState(user?.name?.last ?? "");
  const [userName, setUserName] = useState(user?.login?.username ?? "");
  const [email, setEmail] = useState(user?.email ?? "");
  const [phoneNumber, setPhoneNumber] = useState(user?.phone ?? "");
  const [gender, setGender] = useState(user?.gender ?? "");

  const createUserInfo = (): UserInfo => {
    const isMale: boolean = gender === "male";
    return {
      name: {
        first: firstName,
        last: lastName,
        title: title,
      },
      login: {
        uuid: user?.login?.uuid ?? uuidv4(),
        username: user?.login?.username ?? userName,
      },
      email: email,
      phone: phoneNumber,
      gender: gender,
      picture:
        user == null
          ? getNewUserPicture(isMale)
          : {
              thumbnail: user.picture.thumbnail,
              medium: user.picture.medium,
              large: user.picture.large,
            },
    };
  };

  const getNewUserPicture = (isMale: boolean): Picture => {
    return {
      thumbnail: isMale
        ? "https://randomuser.me/api/portraits/thumb/men/1.jpg"
        : "https://randomuser.me/api/portraits/thumb/women/1.jpg",
      medium: isMale
        ? "https://randomuser.me/api/portraits/med/men/1.jpg"
        : "https://randomuser.me/api/portraits/med/women/1.jpg",
      large: isMale
        ? "https://randomuser.me/api/portraits/men/1.jpg"
        : "https://randomuser.me/api/portraits/women/1.jpg",
    };
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();

    const form = event.currentTarget;
    const isFormValid: boolean = form.checkValidity();

    if (isFormValid) {
      const newUser: UserInfo = createUserInfo();
      onSave(newUser);
    } else {
      event.stopPropagation();
    }

    setValidated(true);
  };

  return (
    <Form
      noValidate
      validated={validated}
      onSubmit={handleSubmit}
      className="user-form"
    >
      <h4>Create User</h4>
      <Row className="mb-3">
        <Form.Group as={Col} md="4" controlId="validationCustomTitle">
          <Form.Label>Title</Form.Label>
          <Form.Select
            required
            value={title}
            onChange={({ target: { value } }) => setTitle(value)}
          >
            <option></option>
            <option value="Mr">Mr</option>
            <option value="Mrs">Mrs</option>
            <option value="Ms">Ms</option>
            <option value="Miss">Miss</option>
            <option value="Sir">Sir</option>
            <option value="Madam">Madam</option>
          </Form.Select>
          <Form.Control.Feedback type="invalid">
            Please select a title.
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group as={Col} md="4" controlId="validationCustomFirstName">
          <Form.Label>First name</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="First name"
            value={firstName}
            onChange={({ target: { value } }) => setFirstName(value)}
          />
          <Form.Control.Feedback type="invalid">
            Please enter a first name.
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group as={Col} md="4" controlId="validationCustomLastName">
          <Form.Label>Last name</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Last name"
            value={lastName}
            onChange={({ target: { value } }) => setLastName(value)}
          />
          <Form.Control.Feedback type="invalid">
            Please enter a last name.
          </Form.Control.Feedback>
        </Form.Group>
      </Row>

      <Row className="mb-3">
        <Form.Group as={Col} md="4" controlId="validationCustomUsername">
          <Form.Label>Username</Form.Label>
          <InputGroup hasValidation>
            <Form.Control
              disabled={user !== null}
              type="text"
              placeholder="Username"
              aria-describedby="inputGroupPrepend"
              required
              value={userName}
              onChange={({ target: { value } }) => setUserName(value)}
            />
            <Form.Control.Feedback type="invalid">
              Please enter a username.
            </Form.Control.Feedback>
          </InputGroup>
        </Form.Group>

        <Form.Group as={Col} controlId="validationCustomEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Email"
            required
            value={email}
            onChange={({ target: { value } }) => setEmail(value)}
          />
          <Form.Control.Feedback type="invalid">
            Please enter a valid email address.
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group as={Col} controlId="validationCustomPhoneNumber">
          <Form.Label>Phone Number</Form.Label>
          <Form.Control
            type="tel"
            placeholder="Phone Number"
            pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
            required
            value={phoneNumber}
            onChange={({ target: { value } }) => setPhoneNumber(value)}
          />
          <Form.Control.Feedback type="invalid">
            Please enter a phone number. Format: 123-456-7890
          </Form.Control.Feedback>
        </Form.Group>
      </Row>

      <Row>
        <Form.Group as={Col} md="4" controlId="validationCustomGender">
          <Form.Label>Gender</Form.Label>
          <Form.Select
            required
            value={gender}
            onChange={({ target: { value } }) => setGender(value)}
          >
            <option></option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </Form.Select>
          <Form.Control.Feedback type="invalid">
            Please select a gender.
          </Form.Control.Feedback>
        </Form.Group>
      </Row>

      <Button className="mt-4" variant="primary" type="submit">
        Save
      </Button>
      <Button className="mt-4 ms-3" variant="secondary" onClick={onCancel}>
        Cancel
      </Button>
    </Form>
  );
};
