// import { , push } from "firebase/database";
import { getDatabase, onValue, ref, set } from "firebase/database";

export interface IUser {
  displayName: string | null;
  email: string | null;
  role: string;
}

const db = getDatabase();
class UserDataService {
  getAll = () => {
    const usersReferance = ref(db, "users");
    const users = onValue(usersReferance, (snapshot) => {
      const data = snapshot.val();
      console.log(data);

      return data;
    });

    return ref(db, "users/");
  };

  create = (user: IUser, uid: string) => {
    return set(ref(db, "users/" + uid), {
      ...user,
    });
  };

  // Following was an attempt to get return authrole from real-time database
  // async getUserAuthorization(uid: string): Promise<string> {
  //   const db = getDatabase();
  //   const snapshot = await Promise.resolve(get(ref(db, "/users/" + uid)));
  //   let user = snapshot.val();
  //   return user.role;
  // }

  syncUserAuthorizationRole = (
    uid: string,
    setAuthorization: React.Dispatch<React.SetStateAction<string | null>>
  ) => {
    onValue(ref(db, "users/" + uid), (snapshot) => {
      const data = snapshot.val();
      setAuthorization(data.role);
    });
  };
}

export default new UserDataService();
