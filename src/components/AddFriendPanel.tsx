import { useState } from "react";
import { Friend, generateDefaultBill } from "../models/Friend";

interface AddFriendPanelProps {
  onFriendAdded: (friend: Friend) => void;
}

export default function AddFriendPanel({ onFriendAdded }: AddFriendPanelProps) {
  const [friendName, setFriendName] = useState("");
  const [imgUrl, setImgUrl] = useState(
    "https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg"
  );

  function handleAdd() {
    onFriendAdded({
      id: new Date().getTime().toString(),
      name: friendName,
      picUrl: imgUrl,
      bill: generateDefaultBill(),
    });

    setFriendName("");
    setImgUrl(
      "https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg"
    );
  }

  return (
    <div className="add-panel">
      <div className="form-input">
        <p>🧑‍🤝‍🧑 Friend name</p>
        <input
          type="text"
          value={friendName}
          onChange={(e) => setFriendName(e.target.value)}
        ></input>
      </div>
      <div className="form-input">
        <p>🖼️ Image URL</p>
        <input
          type="text"
          value={imgUrl}
          onChange={(e) => setImgUrl(e.target.value)}
        ></input>
      </div>
      <div style={{ display: "flex", justifyContent: "end" }}>
        <button
          disabled={!friendName}
          style={{ width: "200px" }}
          onClick={handleAdd}
        >
          Add
        </button>
      </div>
    </div>
  );
}
