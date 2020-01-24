import React from "react";
import { connect } from "react-redux";
import "./Orders.scss";
import OrderDetails from "./OrderDetails";

class Orders extends React.Component {
  constructor(props) {
    super(props);
    this.toggleExpand = id => {
      this.props.ToggleOrderExpand(id);
      this.props.SetLastexpand(id);
      fetch("http://127.0.0.1:8080/api/order/" + id)
        .then(res => res.json())
        .then(
          result => {
            this.props.SetOrderData(result);
          },
          error => {
            this.props.SetOrderError(error);
          }
        );
    };
  }
  componentDidMount() {
    fetch("http://127.0.0.1:8080/api/order")
      .then(res => res.json())
      .then(
        result => {
          this.props.SetOrders(result);
        },
        error => {
          this.props.SetOrdersError(error);
        }
      );
  }
  render() {
    return (
      <div className="OrdersWrapper">
        {this.props.Data.Orders.map((order, orderindex) => (
          <div>
            <div className="OrderWrapper"  onClick={this.toggleExpand.bind(this, order.id)}>
              <div
                className={this.props.Data.Expanded.find(
                    ExpandedElemen => ExpandedElemen === order.id
                  )?'OrderWrapperArrow up':'OrderWrapperArrow down'}
               
              ></div>
              <div className="OrderWrapperDocdate">
                <div className="OrderWrapperDocdateTittle">Дата заказа</div>{" "}
                <div className="OrderWrapperDocdateData">{order.docDate}</div>
              </div>
              <div className="OrderWrapperDocnumber">
                {" "}
                <div className="OrderWrapperDocnumberTittle">Номер заказа</div>
                <div className="OrderWrapperDocnumberData">{order.docNum}</div>
              </div>
              <div className="OrderWrapperDescription">
                {" "}
                <div className="OrderWrapperDescriptionTittle">Описание</div>
                <div className="OrderWrapperDescriptionData">
                  {order.description}
                </div>
              </div>
            </div>
            <div
              className={
                this.props.Data.Expanded.find(
                  ExpandedElemen => ExpandedElemen === order.id
                )
                  ? "OrderDetailsExpanded"
                  : "OrderDetailsCollapsed"
              }
            >
              <OrderDetails Order={orderindex} />
            </div>
          </div>
        ))}{" "}
      </div>
    );
  }
}

//Подключение к store
export default connect(
  store => ({
    Data: store
  }),
  dispatch => ({
    SetOrders: Orders => {
      dispatch({ type: "SET_ORDERS", orders: Orders });
    },
    SetOrderData: OrderData => {
      dispatch({ type: "SET_ORDERDATA", orderdata: OrderData });
    },
    SetLastexpand: Lastexpand => {
      dispatch({ type: "SET_LASTEXPAND", lastexpand: Lastexpand });
    },
    SetOrdersError: Error => {
      dispatch({ type: "SET_ORDERSERROR", error: Error });
    },

    ToggleOrderExpand: Order => {
      dispatch({ type: "TOGGLE_ORDEREXPAND", order: Order });
    }
  })
)(Orders);
