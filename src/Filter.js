import React from "react";
import { connect } from "react-redux";
import "./Filter.scss";

class Filter extends React.Component {
  constructor(props) {
    super(props);
    this.PlayAreaDiv = React.createRef();
    this.timeout = null;
    //добавим секундную задержку, чтобы не гонять траффик на каждую введенную букву
    this.Filter = () => {
      clearTimeout(this.timeout);
      setTimeout(this.GetData, 1000);
    };
    this.GetData = () => {
      fetch(
        "http://127.0.0.1:8080/api/order?filter=" +
          this.PlayAreaDiv.current.value
      )
        .then(res => res.json())
        .then(
          result => {
            this.props.SetOrders(result);
          },
          error => {}
        );
    };
  }
  render() {
    return (
      <div className="FilterWrapper">
        <div className="FilterWrapperHeader">Фильтр: </div>
        <div className="FilterWrapperInputcontainer">
          <input
            type="text"
            ref={this.PlayAreaDiv}
            className="FilterWrapperInput"
            onChange={this.Filter.bind(this)}
          />{" "}
        </div>
      </div>
    );
  }
}

export default connect(
  store => ({
    Data: store
  }),
  dispatch => ({
    SetOrders: Orders => {
      dispatch({ type: "SET_ORDERS", orders: Orders });
    }
  })
)(Filter);
