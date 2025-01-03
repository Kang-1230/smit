import Image from "next/image";
import ModalOverlay from "./ModalOverlay";
import MyButton from "./Button";
import Link from "next/link";

const LoginModal = ({ onClose }: { onClose: () => void }) => {
  return (
    <ModalOverlay onClick={onClose}>
      <div className="relative mb-[16px] h-[161px] w-[178px] md:mb-[20px] md:mt-[44px] md:h-[180px] md:w-[200px]">
        <Image
          src={`/icons/Write.svg`}
          alt="Warning icon"
          fill
          className="object-cover"
        />
      </div>
      <p className="title-20-s md:title-24-s mb-[8px] md:mb-[16px]">
        로그인 후 이용할 수 있어요!
      </p>
      <p className="body-14-m md:body-16-m text-[#484741]">
        지금 바로 로그인 하시겠습니까?
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
        <Link href={"/login"} className="w-full">
          <MyButton size="lg" style="black-fill" className={"w-full"}>
            로그인 하기
          </MyButton>
        </Link>
      </div>
    </ModalOverlay>
  );
};

export default LoginModal;
