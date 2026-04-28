import "./pedidosRecentes.css";

const orders = [
  {
    id: "#1234",
    name: "Customer Name",
    status: "Pending",
    value: "$120.00",
    avatar: "https://i.pravatar.cc/40?img=1",
  },
  {
    id: "#1235",
    name: "Coffee Maker",
    status: "Paid",
    value: "$250.00",
    avatar: "https://i.pravatar.cc/40?img=2",
  },
  {
    id: "#1236",
    name: "External Shipped",
    status: "Shipped",
    value: "$80.00",
    avatar: "https://i.pravatar.cc/40?img=3",
  },
  {
    id: "#1237",
    name: "Red Chair",
    status: "Canceled",
    value: "$60.00",
    avatar: "https://i.pravatar.cc/40?img=4",
  },
];

export default function PedidosRecentes() {
  return (
    <div className="orders">


      <div className="orders-header">
        <span>Order ID</span>
        <span>Customer</span>
        <span>Status</span>
        <span>Total</span>
      </div>

      <div className="orders-list">
        {orders.map((order, index) => (
          <div className="order-item" key={index}>
            <span>{order.id}</span>

            <div className="customer">
              <img src={order.avatar} alt="" />
              <span>{order.name}</span>
            </div>

            <span className={`status ${order.status.toLowerCase()}`}>
              {order.status}
            </span>

            <span className="value">{order.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}