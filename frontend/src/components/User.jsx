import React from "react";
import Button from "./Button";
import { Link, NavLink, useNavigate } from "react-router-dom";

const User = ({ user }) => {
  const navigate = useNavigate();
  return (
    <div className="flex justify-between">
      <div className="flex">
        <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
          <div className="flex flex-col justify-center h-full text-xl">
            {user.firstname[0]}
          </div>
        </div>
        <div className="flex flex-col justify-center h-ful">
          <div>
            {user?.firstname} {user?.lastname}
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-center h-ful">
        <Button
          label={"Send Money"}
          onClick={(e) => {
            navigate("/send?id=" + user._id + "&name=" + user.firstname);
          }}
        />
      </div>
    </div>
  );
};

export default User;
