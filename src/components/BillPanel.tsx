import { Bill, Friend } from "../models/Friend";

interface BillPanelProps {
  friend: Friend;
  currentBill: Bill;
  onBillUpdated: (bill: Bill) => void;
  onBillSplit: (bill: Bill) => void;
}

export default function BillPanel({
  friend,
  currentBill,
  onBillUpdated,
  onBillSplit,
}: BillPanelProps) {
  function splitBill() {
    onBillSplit(currentBill);
  }

  return (
    <div className="bill-panel">
      <h3>{`Split a bill with ${friend.name}`.toUpperCase()}</h3>
      <div className="form-input">
        <p>💰 Bill value</p>
        <input
          type="number"
          min={0}
          value={(+currentBill?.billTotal).toString()}
          onChange={(e) =>
            onBillUpdated({
              ...currentBill,
              billTotal:
                +e.target.value < currentBill.debt
                  ? currentBill.billTotal
                  : +e.target.value,
            })
          }
        ></input>
      </div>
      <div className="form-input">
        <p>🧍 Your expense</p>
        <input
          type="number"
          value={(+currentBill?.debt).toString()}
          min={0}
          onChange={(e) =>
            onBillUpdated({
              ...currentBill,
              debt:
                +e.target.value > currentBill.billTotal
                  ? currentBill.debt
                  : +e.target.value,
            })
          }
        ></input>
      </div>
      <div className="form-input">
        <p>
          🧑‍🤝‍🧑 {friend.name}
          {friend.name.charAt(friend.name.length - 1) === "s" ? "'" : "'s"}{" "}
          expense
        </p>
        <input
          type="number"
          disabled
          value={+currentBill.billTotal - +currentBill.debt}
        ></input>
      </div>
      <div className="form-input">
        <p>🤑 Who is paying the bill?</p>
        <select
          value={currentBill.payer}
          onChange={(e) =>
            onBillUpdated({ ...currentBill, payer: e.target.value })
          }
        >
          <option value="You">You</option>
          <option value="Friend">{friend.name}</option>
        </select>
      </div>

      <div style={{ display: "flex", justifyContent: "end" }}>
        <button
          disabled={!currentBill.billTotal || !currentBill.payer}
          onClick={splitBill}
        >
          Split Bill
        </button>
      </div>
    </div>
  );
}
