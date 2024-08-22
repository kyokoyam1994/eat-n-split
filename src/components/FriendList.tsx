import { Friend } from "../models/Friend";
import FriendEntry from "./FriendEntry";

interface FriendListProps {
  friendList: Friend[];
  currentSelected: string;
  onFriendSelected: (friend: string) => void;
  onFriendDeselected: () => void;
}

export default function FriendList({
  friendList,
  currentSelected,
  onFriendSelected,
  onFriendDeselected,
}: FriendListProps) {
  return friendList.map((friend) => (
    <FriendEntry
      key={friend.id}
      friend={friend}
      currentSelected={currentSelected}
      onFriendSelected={onFriendSelected}
      onFriendDeselected={onFriendDeselected}
    />
  ));
}
