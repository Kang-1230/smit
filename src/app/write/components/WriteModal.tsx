import Link from "next/link";
import React from "react";
import { Tables } from "../../../../database.types";

type ModalProps = {
  isModalOpen: boolean;
  onClose: () => void;
  onConfirm: (studyId: string, studyName: string) => void;
  modalMode: string;
  studyGroup?: Tables<"study">[] | null | undefined;
};

const WriteModal = (props: ModalProps) => {
  return props.isModalOpen ? (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center w-full z-50">
      <div className="fixed inset-x-0 bottom-20 bg-white rounded-t-2xl shadow-lg flex flex-col w-full h-2/5 overflow-y-auto">
        <h1 className="text-xl p-3 font-bold">스터디 그룹 선택</h1>
        {props.studyGroup &&
          props.studyGroup.map((item) => (
            <div
              key={item.study_id}
              className="flex justify-between items-center w-full p-2 h-fit"
            >
              <p className="font-bold">{item.study_name}</p>
              <button
                type="button"
                className="bg-zinc-500 rounded-lg text-white p-1 ml-4 w-1/6"
                onClick={() => props.onConfirm(item.study_id, item.study_name)}
              >
                선택
              </button>
            </div>
          ))}
      </div>
    </div>
  ) : null;
};

export default WriteModal;
