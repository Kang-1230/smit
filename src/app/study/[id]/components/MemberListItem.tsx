import Image from "next/image";
import { JoinPersonWithManager } from "../../components/MyStudyList";
import { useUserByCommentId } from "@/app/post/[id]/hooks/useComments";
import MyButton from "@/components/common/Button";

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

  return (
    <section key={manageUser.id} className="mb-3 flex gap-[10px]">
      {data?.profile_img && (
        <Image
          src={data.profile_img}
          alt="profile"
          width={40}
          height={40}
          className="aspect-square shrink-0 rounded-full border border-black/20 object-cover"
        />
      )}
      <div className="flex flex-1 items-center justify-between">
        <div className="body-14-m md:body-16-m">{manageUser.user.name}</div>
        <div className="flex items-center gap-1 md:hidden">
          <MyButton
            onClick={() => resignUser(manageUser.id)}
            size="sm"
            style="beige"
          >
            강퇴
          </MyButton>
          <MyButton
            onClick={() => changeManager(manageUser)}
            size="sm"
            style="orange-line"
            className="flex"
          >
            방장
            <Image
              src={"/icons/CrownFilled.svg"}
              alt="crown"
              width={16}
              height={16}
              className="ml-[2px]"
            />
          </MyButton>
        </div>
        <div className="hidden items-center gap-1 md:flex">
          <MyButton
            onClick={() => resignUser(manageUser.id)}
            size="md"
            style="beige"
          >
            강퇴
          </MyButton>
          <MyButton
            onClick={() => changeManager(manageUser)}
            size="md"
            style="orange-line"
            className="flex"
          >
            방장
            <Image
              src={"/icons/CrownFilled.svg"}
              alt="crown"
              width={16}
              height={16}
              className="ml-[2px]"
            />
          </MyButton>
        </div>
      </div>
    </section>
  );
};

export default MemberListItem;
