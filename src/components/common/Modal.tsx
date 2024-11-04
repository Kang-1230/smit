import Link from "next/link";
import React from "react";


type ModalProps = {
  isModalOpen: boolean;
  onClose: () => void;
  modalMode: string;
};

const Modal = (props: ModalProps) => {
    return props.isModalOpen ? (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center w-full z-50">
        <div className="fixed inset-x-0 bottom-0 bg-white rounded-t-2xl w-full shadow-lg flex flex-col w-5/6 h-2/5 overflow-y-auto focus:overscroll-contain">
          <h1 className="text-xl font-bold pl-5 pt-5">
            {props.modalMode === "job" ? "직업 태그 선택" : "스터디 태그 선택"}
          </h1>
          
    
        </div>
      </div>
    ) : null;
  };
  

  export default Modal;