import React, { useEffect, useState } from "react";
import User from "./User";

const Users = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:3000/api/v1/user/bulk?filter" + users)
      .then((response) => {
        setUsers(response?.data?.user);
      });
  }, []);
  return (
    <>
      <div className="font-bold mt-6 text-lg">Users</div>
      <div className="my-2">
        <input
          type="text"
          placeholder="Search users..."
          className="w-full px-2 py-1 border rounded border-slate-200"
          onChange={(e) => {
            setUsers(e.target.value);
          }}
        ></input>
      </div>
      <div>
        {users.map((user, index) => (
          <User user={user} key={index} />
        ))}
      </div>
    </>
  );
};

export default Users;
// function User({ user }) {
//   return (
//     <div className="flex justify-between">
//       <div className="flex">
//         <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
//           <div className="flex flex-col justify-center h-full text-xl">
//             {user.firstName[0]}
//           </div>
//         </div>
//         <div className="flex flex-col justify-center h-ful">
//           <div>
//             {user.firstName} {user.lastName}
//           </div>
//         </div>
//       </div>

//       <div className="flex flex-col justify-center h-ful">
//         <Button label={"Send Money"} />
//       </div>
//     </div>
//   );
// }
