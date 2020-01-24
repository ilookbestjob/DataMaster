import React from "react";
import { connect } from "react-redux";
import "./OrderDetails.scss";

class OrderDetails extends React.Component {
  render() {
    console.log("#", this.props.Order);
    return (
      <div className="DetailWrapper">
        {" "}
        <div className="DetailWrapperNameGrid Header">
          <div className="DetailWrapperName"> Наименование</div>
          <div className="DetailWrapperQuantity">Количество</div>
          <div className="DetailWrapperPrice">Цена</div>
          <div className="DetailWrapperSum">Сумма</div>
        </div>
        {this.props.Data.Orders[this.props.Order].Details
          ? this.props.Data.Orders[this.props.Order].Details.map(
              (detail, detailIndex) => (
                <div className="DetailWrapperNameGrid">
                  <div className="DetailWrapperName"> {detail.name}</div>
                  <div className="DetailWrapperQuantity">{detail.qty}</div>
                  <div className="DetailWrapperPrice">{detail.price}</div>
                  <div className="DetailWrapperSum">{detail.sum}</div>
                </div>
              )
            )
          : ""}
      </div>
    );
  }
}

//Подключение к store
export default connect(
  store => ({
    Data: store
  }),
  dispatch => ({})
)(OrderDetails);
