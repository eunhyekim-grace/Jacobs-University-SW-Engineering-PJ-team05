import React from "react";
import { Link } from "react-router-dom";


const Role = (props) => {
  return (
    <div className="col-md-12">
      <div className="card card-container">
        <h4 className="text-center"> Play as: </h4>

        <Link to="/game-page-factory" className="text-center">
          <button className="btn btn-warning btn-lg m-2">Factory</button>
        </Link>

        <Link to="/game-page-distributor" className="text-center">
          <button className="btn btn-warning btn-lg m-2">Distributor</button>
        </Link>

        <Link to="/game-page-wholesaler" className="text-center">
          <button className="btn btn-warning btn-lg m-2">Wholesaler</button>
        </Link>

        <Link to="/game-page-retailer" className="text-center">
          <button className="btn btn-warning btn-lg m-2">Retailer</button>
        </Link>

      </div>
    </div>
  );
};
export default Role;
