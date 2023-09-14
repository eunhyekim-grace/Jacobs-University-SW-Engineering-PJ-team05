import React from "react";
import PropTypes from "prop-types";


/**
 * Show error on missing value
 * @param {*} value
 * @returns {HTMLElement} This field is required!
 */

//required inputs
const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

//generate gameid
//https://stackoverflow.com/questions/1349404/generate-random-string-characters-in-javascript
function makeid(length) {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}
class GameSettings extends React.Component {
  constructor(props) {
    super(props);
    this.state = { rows: [{}] };
  }

  //https://www.robinwieruch.de/react-remove-item-from-list for editing the table functions
  getDefault = () => {
    return { rows: this.props.rows };
  };
  change = (tid) => (i) => {
    const { name, value } = i.target;
    const rows = [...this.state.rows];
    rows[tid] = {
      [name]: value,
    };
    this.setState({
      rows,
    });
  };

  deleteRow = (tid) => () => {
    const rows = [...this.state.rows];
    rows.splice(tid, 1);
    this.setState({ rows });
  };

  addRow = () => {
    const item = {
      delay: "",
      wholesalerP: "",
      retailerP: "",
      storageCost: "",
      BacklogCost: "",
      Round_no: "",
      GameID: "",
    };
    this.setState({
      rows: [...this.state.rows, item],
    });
  };

  render() {
    return (
      <div>
        <div>
          <div>
            <div>
            

              <table id="table" className="table table-dark">
                <thead>
                  <tr>
                    <th> # </th>
                    <th scope="col"> Delay </th>
                    <th scope="col"> Wholesaler present? </th>
                    <th scope="col"> Retailer present? </th>
                    <th scope="col"> Storage Cost </th>
                    <th scope="col"> Backlog cost</th>
                    <th scope="col"> Round no.</th>
                    <th scope="col"> Game ID</th>
                    <th />
                  </tr>
                </thead>

                <tbody>
                  {this.state.rows.map((item, tid) => (
                    <tr id="rowno" key={tid}>
                      <td>{tid + 1}</td>
                      <td>
                        <input
                          type="number"
                          style={{
                            width: "50px",
                          }}
                          placeholder="0"
                          validations={[required]}
                          value={this.state.rows[tid].time_delay}
                          onChange={this.change(tid)}
                          name="delay"
                        />
                      </td>
                      <td>
                        <input
                          type="checkbox"
                          name="wholesalerP"
                          validations={[required]}
                          value={this.state.rows[tid].wholesalerP}
                          onChange={this.change(tid)}
                        />
                      </td>
                      <td>
                        <input
                          type="checkbox"
                          name="retailerP"
                          validations={[required]}
                          value={this.state.rows[tid].retailerP}
                          onChange={this.change(tid)}
                        />
                      </td>
                      <td>
                        <input
                          style={{
                            width: "50px",
                          }}
                          validations={[required]}
                          placeholder="0.0"
                          type="number"
                          name="storageCost"
                          value={this.state.rows[tid].storageCost}
                          onChange={this.change(tid)}
                        />
                      </td>
                      <td>
                        <input
                          style={{
                            width: "50px",
                          }}
                          validations={[required]}
                          placeholder="0.0"
                          type="number"
                          name="BacklogCost"
                          value={this.state.rows[tid].BacklogCost}
                          onChange={this.change(tid)}
                        />
                      </td>
                      <td>
                        <input
                          style={{
                            width: "50px",
                          }}
                          validations={[required]}
                          placeholder="0.0"
                          type="number"
                          name="Round_no"
                          value={this.state.rows[tid].Round_no}
                          onChange={this.change(tid)}
                        />
                      </td>
                      <td>{makeid(9)}</td>
                      <td>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={this.deleteRow(tid)}
                        >
                          Remove
                        </button>
                      </td>
                      <td>
                        <button className="btn btn-warning btn-sm">View</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <button
                style={{
                  marginLeft: "50px",
                }}
                onClick={this.addRow}
                className="btn btn-info btn-sm"
              >
                Add Game
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
GameSettings.prototypes = {
  /*
   * History prop type
   */
  history: PropTypes.object,
};
export default GameSettings;
