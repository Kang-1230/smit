import Image from "next/image";
import ModalOverlay from "./ModalOverlay";
import MyButton from "./Button";

const DeleteModal = ({
  onClose,
  onDelete,
}: {
  onClose: () => void;
  onDelete: () => void;
}) => {
  return (
    <ModalOverlay onClick={onClose}>
      <div className="relative mb-[16px] h-[161px] w-[178px] md:mb-[20px] md:mt-[44px] md:h-[180px] md:w-[200px]">
        <Image
          src={`/icons/Warning.svg`}
          alt="Warning icon"
          fill
          className="object-cover"
        />
      </div>
      <p className="title-20-s md:title-24-s mb-[8px] md:mb-[16px]">
        삭제하시겠습니까?
      </p>
      <p className="body-14-m md:body-16-m text-[#484741]">
        삭제 후 복구가 불가능합니다.
      </p>
      <div className="mt-[28px] flex w-full flex-row gap-x-[4px] md:mt-[72px] md:gap-x-[8px]">
        <MyButton
          size="lg"
          style="black-line"
          onClick={(e) => {
            onClose();
            e.stopPropagation();
            e.preventDefault();
          }}
        >
          취소
        </MyButton>
        <MyButton
          size="lg"
          style="black-fill"
          className={"w-full"}
          onClick={onDelete}
        >
          삭제하기
        </MyButton>
      </div>
    </ModalOverlay>
  );
};

export default DeleteModal;
