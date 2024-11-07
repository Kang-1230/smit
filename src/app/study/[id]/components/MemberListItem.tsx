import CustomButton from "@/components/ui/CustomButton";
import Image from "next/image";
import { JoinPersonWithManager } from "../../components/MyStudyList";
import browserClient from "@/utils/supabase/client";
import { useUserByCommentId } from "@/app/post/[id]/hooks/useComments";

interface MemberListItemProps {
  manageUser: JoinPersonWithManager;
  resignUser: (id: string) => Promise<void>;
  changeManager: (relevantuser: JoinPersonWithManager) => Promise<void>;
}

const MemberListItem = ({
  manageUser,
  resignUser,
  changeManager,
}: MemberListItemProps) => {
  const { data } = useUserByCommentId(manageUser.user_id);

  const UserProfileImg = browserClient.storage
    .from("profile_img")
    .getPublicUrl(data?.profile_img ?? "default").data.publicUrl;

  return (
    <section key={manageUser.id} className="mb-3 flex gap-[10px]">
      <Image src={UserProfileImg} alt="profile" width={40} height={40} />
      <div className="flex flex-1 items-center justify-between">
        <div>{manageUser.user.name}</div>
        <div className="flex items-center gap-1">
          <CustomButton
            onClick={() => resignUser(manageUser.id)}
            size="small"
            text="강퇴"
          />
          <button
            onClick={() => changeManager(manageUser)}
            className="flex items-center justify-center rounded-[14px] border border-primary-100 px-[12px] py-[4px] text-[14px] leading-none text-primary-100"
          >
            방장
            <Image
              src={"/icons/CrownFilled.svg"}
              alt="crown"
              width={16}
              height={16}
              className="ml-[2px]"
            />
          </button>
        </div>
      </div>
    </section>
  );
};

export default MemberListItem;
