export interface Friend {
  id: number;
  name: string;
  picUrl: string;
  bill: Bill;
}

export interface Bill {
  billTotal: number;
  debt: number;
  payer: string;
}

export function generateDefaultBill(): Bill {
  return {
    billTotal: 0,
    debt: 0,
    payer: "You",
  };
}
