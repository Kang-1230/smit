import { useUserByCommentId } from "@/app/post/[id]/hooks/useComments";
import { MemoWithUser } from "@/types/PersonalMemo";
import Image from "next/image";

interface MemoMemberListProps {
  memoData: MemoWithUser;
  findMemoForWeb: (userId: string) => void;
  isSelected: boolean;
}

const MemoMemberList = ({
  memoData,
  findMemoForWeb,
  isSelected,
}: MemoMemberListProps) => {
  const { data: user } = useUserByCommentId(memoData.user_id);

  return (
    <div className="hidden flex-shrink-0 xl:block">
      {user?.profile_img && (
        <Image
          src={user?.profile_img}
          alt="profile"
          width={56}
          height={56}
          className={`aspect-square cursor-pointer rounded-full border object-cover ${isSelected ? "border-primary-50" : "border-white/50"}`}
          onClick={() => findMemoForWeb(memoData.user_id)}
        />
      )}
    </div>
  );
};

export default MemoMemberList;
