import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import React, { useState } from "react";
import styled from "styled-components";
import EnhancedTable from "../shared/elements/table";
import { useEffectOnce } from "react-use";
import UserService from "../shared/services/user";
import { ITableColumn, ITableRow } from "../shared/interfaces/table";
import { useDispatch, useSelector } from "react-redux";
import { IStoreState, IUserState } from "../shared/interfaces/store";
import UserAction from "../shared/redux/action";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { useHistory } from "react-router-dom";
import { ROUTES } from "../shared/constants/routes";

const Dashboard: React.FC = () => {
  const history = useHistory();
  const { data, hasInitialized } = useSelector<IStoreState, IUserState>((state) => state.users);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<ITableRow | undefined>(
    undefined
  );

  const columns: ITableColumn[] = [
    {
      id: "id",
      numeric: false,
      disablePadding: false,
      label: "ID",
      hasSort: false,
    },
    {
      id: "name",
      numeric: false,
      disablePadding: false,
      label: "Name",
      hasSort: false,
    },
    {
      id: "username",
      numeric: false,
      disablePadding: false,
      label: "Username",
      hasSort: true,
    },
    {
      id: "email",
      numeric: false,
      disablePadding: false,
      label: "Email",
      hasSort: false,
    },
    {
      id: "city",
      numeric: false,
      disablePadding: false,
      label: "City",
      hasSort: false,
    },
  ];

  const onNew = () => {
    history.push(ROUTES.NEW_USER);
  };

  const onEdit = (user: ITableRow) => {
    history.push(ROUTES.EDIT_USER.parse(`${user.id}`));
  };

  const onDelete = (user: ITableRow) => {
    setUserToDelete(user);
    setOpen(true);
  };

  useEffectOnce(() => {
    if (!hasInitialized) {
      UserService.getUsers().then((users) =>
        dispatch(UserAction.setUsers(users))
      );
    }
  });

  return (
    <DashboardContainer>
      <h1 className="page-header">Dashboard</h1>
      <Card className="list-container">
        <CardContent>
          <div className="row">
            <h3>User List</h3>
            <Button color="primary" variant="contained" onClick={onNew}>
              Add User
            </Button>
          </div>
          <EnhancedTable
            columns={columns}
            data={data}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        </CardContent>
      </Card>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Delete Record</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this record?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setOpen(false)}
            color="error"
            variant="outlined"
          >
            Cancel
          </Button>
          <Button
            onClick={() => {
              userToDelete && dispatch(UserAction.deleteUser(userToDelete.id));
              setOpen(false);
            }}
            autoFocus
            color="error"
            variant="contained"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </DashboardContainer>
  );
};

export default Dashboard;

const DashboardContainer = styled.div`
  height: 100%;
  padding: 24px;
  width: 100%;
  .page-header {
    font-weight: bold;
    margin-left: 8px;
    margin-bottom: 24px;
    font-size: 24px;
  }
  .list-container {
    width: 100%;
    background-color: #ffffffea;
    padding: 8px;
    .row {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 16px;
    }
  }
`;
