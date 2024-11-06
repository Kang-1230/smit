"use client";
import {
  fetchCategoryTags,
  fetchJobTags,
} from "@/utils/supabase/supabase-server";
import React, { useEffect, useState } from "react";
import { Tables } from "../../../database.types";
import Image from "next/image";
import Union from "../../../public/icons/Union.svg";

type ModalProps = {
  isModalOpen: boolean;
  onClose: () => void;
  onConfirm: (arr: string[]) => void;
  modalMode: string;
};

const Modal = (props: ModalProps) => {
  const [jobTags, setJobTags] = useState<Tables<"job_tag">[]>([]);
  const [categoryTags, setCategoryTags] = useState<Tables<"category_tag">[]>(
    [],
  );
  const [arr, setArr] = useState<string[]>([]);
  // 직업 선택 태그를 위한 선택 number
  const [selectedButtonId, setSelectedButtonId] = useState<number | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (props.modalMode === "job") {
        setJobTags(await fetchJobTags());
      } else {
        setCategoryTags(await fetchCategoryTags());
      }
    };

    // 모달이 열릴 때만 데이터 가져오기
    if (props.isModalOpen) {
      fetchData();
    }
  }, [props.isModalOpen]);

  return props.isModalOpen ? (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center w-full z-50"
      onClick={props.onClose}
    >
      <div
        className="fixed inset-x-0 bottom-0 bg-white rounded-t-2xl w-full shadow-lg flex flex-col h-2/5 overflow-y-auto focus:overscroll-contain"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col justify-center w-full p-5">
          <h1 className="title-20-m">
            {props.modalMode === "job" ? "직업 태그 선택" : "스터디 태그 선택"}
          </h1>
          <p className="body-16-m text-secondary-400 pt-2">
            {props.modalMode === "job"
              ? "최대 1개 선택해주세요"
              : "최대 3개 선택해주세요"}
          </p>

          <div className="mt-3 flex">
            {props.modalMode === "job" && arr.length > 0 ? (
              <button className="bg-primary-50 text-white m-1 px-2 rounded-full ... w-fit body-14-m overflow-hidden text-ellipsis whitespace-nowrap flex items-center pl-3">
                {arr[0] || null}
                <Image
                  src={Union}
                  alt="union"
                  width={10}
                  height={10}
                  className="m-2"
                  onClick={() => {
                    setArr((prevArr) => prevArr.slice(1));
                  }}
                />
              </button>
            ) : (
              arr.map((item) => (
                <button
                  key={item}
                  className="bg-primary-50 text-white rounded-full ... m-1 px-2 w-fit body-14-m overflow-hidden text-ellipsis whitespace-nowrap flex items-center pl-3"
                >
                  {item}
                  <Image
                    src={Union}
                    alt="union"
                    width={10}
                    height={10}
                    className="m-2"
                    onClick={() => {
                      setArr(arr.filter((test) => test !== item));
                    }}
                  />
                </button>
              ))
            )}
          </div>

          <h1 className="body-16-m pt-7">
            {props.modalMode === "job" ? "직업" : "분야"}
          </h1>
          <div className="flex flex-wrap w-full h-fit pt-2">
            {props.modalMode === "job"
              ? jobTags.map((item) => (
                  <button
                    key={item.id}
                    className={`m-1 px-2 body-14-m border rounded-full ... overflow-hidden text-ellipsis whitespace-nowrap ${
                      selectedButtonId === item.id
                        ? "border-primary-50 text-primary-50 bg-primary-5"
                        : ""
                    }`}
                    onClick={() => {
                      setArr((prevArr) => {
                        if (item.name) {
                          setSelectedButtonId(item.id);
                          return [item.name]; // item.name을 0번째 자리에 추가
                        }
                        return prevArr; // item.name이 null일 경우 이전 상태 유지
                      });
                    }}
                  >
                    {item.name}
                  </button>
                ))
              : categoryTags.map((item) => (
                  <button
                    key={item.id}
                    className={`m-1 px-2 body-14-m border rounded-full ... overflow-hidden text-ellipsis whitespace-nowrap ${
                      item.name && arr?.includes(item.name)
                        ? "border-primary-50 text-primary-50 bg-primary-5"
                        : ""
                    }`}
                    onClick={() => {
                      if (item.name) {
                        if (arr.length !== 0) {
                          if (!arr.includes(item.name) && arr.length < 3) {
                            setArr([...arr, item.name]);
                          }
                        } else {
                          setArr([item.name]);
                        }
                      }
                    }}
                  >
                    {item.name}
                  </button>
                ))}
          </div>

          <button
            className="mt-5 p-3 w-full rounded-full ... body-16-s text-white bg-secondary-900"
            onClick={() => props.onConfirm(arr)}
          >
            적용하기
          </button>
        </div>
      </div>
    </div>
  ) : null;
};

export default Modal;
