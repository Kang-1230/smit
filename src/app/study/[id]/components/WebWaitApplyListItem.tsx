import Image from "next/image";
import { Tables } from "../../../../../database.types";
import MyButton from "@/components/common/Button";
import { JoinPerson } from "../../components/MyStudyList";
import { UseMutateFunction } from "@tanstack/react-query";

type WebWaitApplyListItemProps = {
  user: Tables<"user">[];
  waitingUser: JoinPerson | undefined;
  MutateDeteleApplyUser: UseMutateFunction<void, Error, JoinPerson, unknown>;
  mutateUpdateApplyUser: UseMutateFunction<
    void,
    Error,
    JoinPerson | undefined,
    unknown
  >;
};

const WebWaitApplyListItem = ({
  user,
  waitingUser,
  MutateDeteleApplyUser,
  mutateUpdateApplyUser,
}: WebWaitApplyListItemProps) => {
  return (
    <div className="flex h-[264px] w-[202px] flex-col items-center rounded-[20px] border border-secondary-100 bg-white px-6 py-5">
      <div className="flex flex-col items-center">
        <Image
          key={user[0].name}
          alt="profileImg"
          className="mb-3 aspect-square shrink-0 rounded-full border border-black/20 object-cover"
          src={
            user[0].profile_img ||
            "https://nkzghifllapgjxacdfbr.supabase.co/storage/v1/object/public/profile_img/default?t=2024-10-29T12%3A08%3A32.075Z"
          }
          width={82}
          height={82}
          unoptimized
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src =
              "https://nkzghifllapgjxacdfbr.supabase.co/storage/v1/object/public/profile_img/default?t=2024-10-29T12%3A08%3A32.075Z";
          }}
        />
        <span className="body-16-m mb-2">{user[0].name}</span>
        <p className="body-14-r mb-[18px] h-[38px]">
          {waitingUser?.apply_message}
        </p>
        <div className="flex w-full items-center gap-1">
          <MyButton
            size="md"
            style="gray"
            onClick={() => {
              if (waitingUser) {
                MutateDeteleApplyUser(waitingUser);
              }
            }}
            className="flex-1"
          >
            거절
          </MyButton>
          <MyButton
            size="md"
            style="beige"
            onClick={() => mutateUpdateApplyUser(waitingUser)}
            className="flex-1"
          >
            수락
          </MyButton>
        </div>
      </div>
    </div>
  );
};

export default WebWaitApplyListItem;
