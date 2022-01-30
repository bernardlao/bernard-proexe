import { Card, CardContent, TextField, Button, Alert } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { useEffectOnce } from "react-use";
import styled from "styled-components";
import { ROUTES } from "../shared/constants/routes";
import { IStoreState, IUserState } from "../shared/interfaces/store";
import { IUser } from "../shared/interfaces/user";
import UserAction from "../shared/redux/action";
import UserService from "../shared/services/user";
import Utils from "../shared/services/utils";

interface IError {
  [key: string]: string;
}

const UserForm: React.FC = () => {
  const { data, nextId } = useSelector<IStoreState, IUserState>((state) => state.users);
  const dispatch = useDispatch();
  const { id } = useParams<{ id?: string }>();
  const history = useHistory();

  const [error, setError] = useState<IError>({});
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [city, setCity] = useState("");

  const [isNew, setIsNew] = useState(true);
  const [hidden, setHidden] = useState(true);
  const [saving, setSaving] = useState(false);

  const onCancel = () => {
    history.push(ROUTES.DASHBOARD);
  };

  const onSubmit = () => {
    console.log("submit");
    setSaving(true);
    let err: IError = {};
    if (name === "") {
      err = {
        ...err,
        name: "Required.",
      };
    }
    if (email === "") {
      err = {
        ...err,
        email: "Required.",
      };
    } else if (!Utils.isEmail(email)) {
      err = {
        ...err,
        email: "Invalid Email.",
      };
    }
    if (Object.keys(err).length > 0) {
      setSaving(false);
      setError(err);
      return;
    } else {
      setError({});
      const userData: IUser = {
        id: id ? Number(id) : nextId,
        name,
        email,
        username,
        city
      }
      dispatch(id ? UserAction.updateUser(userData) : UserAction.addUser(userData))
      setSaving(false);
      history.push(ROUTES.DASHBOARD);
    }
  };

  const populateData = useCallback(() => {
    setIsNew(false);
    const toEdit = data.find((item) => `${item.id}` === id);
    if (toEdit) {
      setName(toEdit.name);
      setEmail(toEdit.email);
      setUsername(toEdit.username);
      setCity(toEdit.city);
      setHidden(false);
    }
  }, [
    setName,
    setEmail,
    setUsername,
    setCity,
    setHidden,
    setIsNew,
    data,
    id
  ])

  useEffect(() => {
    if (data && id && hidden) {
      populateData();
    }
  }, [populateData, data, id, hidden]);

  useEffectOnce(() => {
    if (id) {
      if (data.length === 0) {
        UserService.getUsers().then((users) =>
          dispatch(UserAction.setUsers(users))
        );
      } else {
        populateData();
      }
    } else {
      setHidden(false);
    }
  });

  return (
    <UserFormContainer isNew={isNew}>
      <h1 className="page-header">Dashboard</h1>
      <Card className="form-container">
        <CardContent>
          <div className="row">
            <h3>Form</h3>
          </div>
          <div
            className="form"
            style={{ visibility: hidden ? "hidden" : "visible" }}
          >
            <TextField
              error={"name" in error ?? false}
              helperText={error?.name}
              required
              label="Name"
              variant="outlined"
              value={name}
              onChange={(e: any) => setName(e.target.value)}
            />
            <TextField
              error={"email" in error ?? false}
              helperText={error?.email}
              required
              label="Email"
              variant="outlined"
              value={email}
              onChange={(e: any) => setEmail(e.target.value)}
            />
            {!isNew && (
              <TextField
                label="Username"
                variant="outlined"
                value={username}
                onChange={(e: any) => setUsername(e.target.value)}
              />
            )}
            {!isNew && (
              <TextField
                label="City"
                variant="outlined"
                value={city}
                onChange={(e: any) => setCity(e.target.value)}
              />
            )}
          </div>
        </CardContent>
        {Object.keys(error).length > 0 && (
          <Alert severity="error">Please re-check your inputs for error.</Alert>
        )}
        <div className="footer-controls">
          <Button
            color="success"
            variant="contained"
            onClick={onSubmit}
            disabled={saving}
          >
            Submit
          </Button>
          <Button
            color="error"
            variant="outlined"
            onClick={onCancel}
            disabled={saving}
          >
            Cancel
          </Button>
        </div>
      </Card>
    </UserFormContainer>
  );
};

export default UserForm;

const UserFormContainer = styled.div<{ isNew: boolean }>`
  height: 100%;
  padding: 24px;
  width: 100%;
  .page-header {
    font-weight: bold;
    margin-left: 8px;
    margin-bottom: 24px;
    font-size: 24px;
  }
  .form-container {
    width: 100%;
    background-color: #ffffffea;
    padding: 8px;
    .row {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      margin-bottom: 16px;
    }
    .form {
      display: grid;
      grid-template-columns: repeat(${(props) => (props.isNew ? 1 : 2)}, 1fr);
      grid-column-gap: 24px;
      grid-row-gap: 24px;
      .MuiOutlinedInput-root {
        input,
        fieldset {
          box-sizing: content-box !important;
        }
      }
    }
    .footer-controls {
      display: flex;
      flex-direction: row-reverse;
      padding: 16px;
      margin-top: 16px;
      & > button {
        margin-left: 16px;
      }
    }
    .MuiAlert-standardError {
      margin: 0 16px;
    }
  }
`;
