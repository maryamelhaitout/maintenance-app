import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../src/redux/authSlice";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  if (!user) {
    navigate("/");
    return null;
  }

  return (
    <div className="d-flex justify-content-center align-items-center  ">
      <div
        className=" text-center rounded-3 p-4 shadow"
        style={{
          border: "1px solid grey",
          minHeight: "250px",
        }}
      >
        <h2>
          Bienvenue {user.name}, sur l'application de gestion des interventions!
        </h2>
        <p>Email: {user.email}</p>
        <button className="btn btn-danger mt-3" onClick={handleLogout}>
          Déconnexion
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
