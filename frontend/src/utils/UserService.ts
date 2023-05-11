// import { , push } from "firebase/database";
import {
  child,
  get,
  getDatabase,
  onValue,
  ref,
  set,
  update,
} from "firebase/database";
import { IUserObject } from "../pages/AdminPage/AdminDash";

export interface IUser {
  displayName: string | null;
  email: string | null;
  role: string;
}

const db = getDatabase();
const usersReference = ref(db, "users");
class UserDataService {
  getAll = (setUsers: React.Dispatch<React.SetStateAction<IUserObject>>) => {
    onValue(usersReference, (snapshot) => {
      let users = snapshot.val();
      setUsers(users);
      console.log(users);
    });

    return ref(db, "users/");
  };

  create = (user: IUser, uid: string) => {
    return set(ref(db, "users/" + uid), {
      ...user,
    });
  };

  exists = (uid: string) => {
    let userExists = get(child(usersReference, uid))
      .then((snapshot) => {
        return snapshot.exists() ? true : false;
      })
      .catch((error) => {
        console.log(error);
      });

    return userExists;
  };

  update = (uid: string, updatedUser: IUser) => {
    console.log("IN UPDATE Function");
    update(ref(db, "users/" + uid), updatedUser)
      .then(() => {
        console.log("Success");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  syncUserAuthorizationRole = (
    uid: string,
    setAuthorization: React.Dispatch<React.SetStateAction<string>>
  ) => {
    let role = get(child(usersReference, uid))
      .then((snapshot) => {
        if (snapshot.exists()) {
          const authRole = snapshot.val();
          setAuthorization(authRole.role);
          return authRole.role;
        } else {
          console.log("No data available");
          return "viewer";
        }
      })
      .catch((error) => {
        console.log(error);
      });
    return role;
  };
}

export default new UserDataService();
