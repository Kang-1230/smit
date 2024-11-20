import { Tables } from "../../../../../database.types";

const WebWaitApplyListItem = ({ user }: { user: Tables<"user">[] }) => {
  return (
    <div className="hidden md:block">
      <div>{user[0].name}</div>
    </div>
  );
};

export default WebWaitApplyListItem;
