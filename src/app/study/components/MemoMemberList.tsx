import { useUserByCommentId } from "@/app/post/[id]/hooks/useComments";
import { MemoWithUser } from "@/types/PersonalMemo";
import Image from "next/image";

interface MemoMemberListProps {
  memoData: MemoWithUser;
  findMemoForWeb: (userId: string) => void;
}

const MemoMemberList = ({ memoData, findMemoForWeb }: MemoMemberListProps) => {
  const { data: user } = useUserByCommentId(memoData.user_id);

  return (
    <div className="hidden xl:block">
      {user?.profile_img && (
        <Image
          src={user?.profile_img}
          alt="profile"
          width={56}
          height={56}
          className="aspect-square cursor-pointer rounded-full border border-white/50 object-cover"
          onClick={() => findMemoForWeb(memoData.user_id)}
        />
      )}
    </div>
  );
};

export default MemoMemberList;
