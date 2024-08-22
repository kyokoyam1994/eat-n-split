import { Friend } from "../models/Friend";

interface FriendProps {
  friend: Friend;
  currentSelected: string;
  onFriendSelected: (friend: string) => void;
  onFriendDeselected: () => void;
}

export default function FriendEntry({
  friend,
  currentSelected,
  onFriendSelected,
  onFriendDeselected,
}: FriendProps) {
  const isCurrentlySelected = currentSelected === friend.id;
  const debt =
    friend.bill.payer === "You"
      ? (friend.bill.billTotal - friend.bill.debt) * -1
      : friend.bill.debt;

  return (
    <div
      className={isCurrentlySelected ? "selected" : ""}
      style={{
        display: "flex",
        alignItems: "center",
        padding: "1rem",
      }}
    >
      <div style={{ display: "flex", justifyContent: "start", gap: "3rem" }}>
        <img src={friend.picUrl}></img>
        <div>
          <p>{friend.name}</p>
          {debt === 0 && (
            <p className="status">You and {friend.name} are even</p>
          )}
          {debt > 0 && (
            <p className="debt">
              You owe {friend.name} ${Math.abs(debt)}
            </p>
          )}
          {debt < 0 && (
            <p className="gain">
              {friend.name} owes you ${Math.abs(debt)}
            </p>
          )}
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "end",
          marginLeft: "3rem",
          flex: 1,
        }}
      >
        <button
          onClick={() =>
            isCurrentlySelected
              ? onFriendDeselected()
              : onFriendSelected(friend.id)
          }
        >
          {isCurrentlySelected ? "Close" : "Select"}
        </button>
      </div>
    </div>
  );
}
