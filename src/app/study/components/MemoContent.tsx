import { MemoWithUser } from "@/types/PersonalMemo";
import { User } from "@supabase/supabase-js";
import Image from "next/image";

interface MemoContentProps {
  contents: string | null;
  isEdit: boolean;
  memoData: MemoWithUser;
  userData: User | null | undefined;
  handleUpdate: () => void;
  setContents: (value: string) => void;
  setIsEdit: (value: boolean) => void;
}

const MemoContent = ({
  contents,
  isEdit,
  memoData,
  userData,
  handleUpdate,
  setContents,
  setIsEdit,
}: MemoContentProps) => {
  if (isEdit) {
    return (
      <>
        <textarea
          value={contents || ""}
          onChange={(e) => setContents(e.target.value)}
          className="my-3 h-[308px] w-full resize-none bg-[#1E1E1E] pb-3 text-secondary-200 focus:outline-none"
          style={{
            scrollbarWidth: "thin",
            scrollbarColor: "#808080 transparent",
          }}
          wrap="soft"
        />
        <button
          onClick={handleUpdate}
          className="absolute bottom-3 right-3 h-10 w-10 rounded-[20px] bg-white p-2.5"
        >
          <Image src="/icons/Check.svg" alt="check" width={24} height={24} />
        </button>
      </>
    );
  }

  return (
    <div>
      <p
        className="z-10 my-3 h-[308px] overflow-y-auto whitespace-pre-wrap text-secondary-200"
        style={{
          scrollbarWidth: "thin",
          scrollbarColor: "#808080 transparent",
          wordBreak: "break-all",
        }}
      >
        {memoData.memo_content}
      </p>
      {userData?.id === memoData.user_id && (
        <button
          onClick={() => setIsEdit(true)}
          className="absolute bottom-3 right-3 z-20 h-10 w-10 rounded-[20px] bg-secondary-700 p-2"
        >
          <Image
            src="/icons/PencilLined.svg"
            alt="edit"
            width={24}
            height={24}
          />
        </button>
      )}
    </div>
  );
};

export default MemoContent;
