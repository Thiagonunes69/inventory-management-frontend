import "../bestSaller/BestSaller.css";
import "./lowVolume.css"
import img from "./image.png";

function LowVolume() {

  // simulando dados vindos do backend (JSON)
  const products = [
    { id: 1, name: "Wireless Mouse", store: "Tech Store", pcs: 100 },
    { id: 2, name: "Keyboard", store: "Gamer Shop", pcs: 80 },
    { id: 3, name: "Headset", store: "Audio Store", pcs: 50 },
    { id: 4, name: "Monitor", store: "Display Hub", pcs: 30 },
    { id: 5, name: "USB Cable", store: "Accessories", pcs: 200 },
    { id: 6, name: "Webcam", store: "Office Gear", pcs: 40 },
  ];

  return (
    <div className="lowVolume ">
      {products.map((item) => (
        <div className="item" key={item.id}>
          <img src={img} alt={item.name} />

          <div className="info">
            <h4>{item.name}</h4>
            <p>{item.store}</p>
          </div>

          <span className="pcs">{item.pcs} pçs</span>

          <button>View</button>
        </div>
      ))}
    </div>
  );
}

export default LowVolume;