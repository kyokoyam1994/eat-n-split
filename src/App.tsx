import { useState } from "react";
import "./App.css";
import { Bill, Friend, generateDefaultBill } from "./models/Friend";
import AddFriendPanel from "./components/AddFriendPanel";
import BillPanel from "./components/BillPanel";
import FriendList from "./components/FriendList";

const existingFriends: Friend[] = [
  {
    id: "1",
    name: "Dave Chappelle",
    picUrl:
      "https://pyxis.nymag.com/v1/imgs/4cc/32d/9b0a0e4be15363979383cd40fc2547dac4-chappelle-speech-netflix.rsquare.w330.jpg",
    bill: generateDefaultBill(),
  },
  {
    id: "2",
    name: "Margot Robbie",
    picUrl:
      "https://hips.hearstapps.com/hmg-prod/images/margot-robbie-attends-the-new-york-premiere-of-asteroid-news-photo-1689698979.jpg?crop=0.733xw:0.489xh;0.107xw,0.0363xh&resize=1200:*",
    bill: generateDefaultBill(),
  },
];

function App() {
  const [friends, setFriends] = useState(existingFriends);
  const [selected, setSelected] = useState("");
  const [currentBill, setCurrentBill] = useState<Bill>(generateDefaultBill());
  const [addPanelVisible, setAddPanelVisible] = useState(false);
  const selectedFriend = friends.find((f) => f.id === selected);

  function handleAddFriend(friend: Friend) {
    const updatedFriends = [...friends, friend];
    setFriends(updatedFriends);
    setAddPanelVisible(false);
  }

  function handleFriendSelected(id: string) {
    setSelected(id);
    setCurrentBill(
      friends.find((f) => f.id === id)?.bill ?? generateDefaultBill()
    );
  }

  function handleFriendDeselected() {
    setSelected("");
    setCurrentBill(generateDefaultBill());
  }

  function handleBillSplit(bill: Bill) {
    const selectedIndex = friends.findIndex((f) => f.id === selectedFriend?.id);
    if (selectedIndex !== -1) {
      const updatedFriends = [...friends];
      updatedFriends[selectedIndex].bill = bill;
      setFriends(updatedFriends);
    }
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        gap: "1rem",
        margin: "2rem",
      }}
    >
      <div>
        <FriendList
          friendList={friends}
          currentSelected={selected}
          onFriendSelected={handleFriendSelected}
          onFriendDeselected={handleFriendDeselected}
        />
        {addPanelVisible && <AddFriendPanel onFriendAdded={handleAddFriend} />}
        <div className="footer">
          <button onClick={() => setAddPanelVisible((visible) => !visible)}>
            {addPanelVisible ? "Close" : "Add Friend"}
          </button>
        </div>
      </div>
      {selectedFriend && (
        <BillPanel
          friend={selectedFriend}
          currentBill={currentBill}
          onBillUpdated={setCurrentBill}
          onBillSplit={handleBillSplit}
        />
      )}
    </div>
  );
}

export default App;
