"use client";
import {
  fetchCategoryTags,
  fetchJobTags,
} from "@/utils/supabase/supabase-server";
import React, { useEffect, useState } from "react";
import { Tables } from "../../../database.types";
import Image from "next/image";
import Union from "../../../public/icons/Union.svg";

type Props = {
  isModalOpen: boolean;
  onClose: () => void;
  onConfirm: (arr: string[]) => void;
  modalMode: string;
  arr: string[];
};

const Modal = (props: Props) => {
  const [jobTags, setJobTags] = useState<Tables<"job_tag">[]>([]);
  const [categoryTags, setCategoryTags] = useState<Tables<"category_tag">[]>(
    [],
  );

  const [arr, setArr] = useState<string[]>(props.arr);

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
  }, [props.isModalOpen, props.modalMode]); // 의존성 배열에 props.modalMode 추가

  useEffect(() => {
    setArr(props.arr); // 부모 컴포넌트에서 전달된 arr을 상태로 설정
  }, [props.arr]); // props.arr 값이 변경될 때마다 실행

  return props.isModalOpen ? (
    <div
      className="fixed inset-0 z-50 flex w-full justify-center bg-black bg-opacity-50"
      onClick={props.onClose}
    >
      <div
        className="fixed inset-x-0 bottom-0 flex h-fit w-full flex-col overflow-y-hidden rounded-t-2xl bg-white shadow-lg focus:overscroll-contain"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex w-full flex-col justify-center p-5">
          <h1 className="title-20-m">
            {props.modalMode === "job" ? "직업 태그 선택" : "스터디 태그 선택"}
          </h1>
          <p className="body-16-m pt-2 text-secondary-400">
            {props.modalMode === "job"
              ? "최대 1개 선택해주세요"
              : "최대 3개 선택해주세요"}
          </p>

          <div className="mt-3 flex">
            {props.modalMode === "job" ? (
              arr[0] !== "" ? (
                <button className="... body-14-m m-1 flex w-fit items-center overflow-hidden text-ellipsis whitespace-nowrap rounded-full bg-primary-50 px-2 pl-3 text-white">
                  {arr[0]}
                  <Image
                    src={Union}
                    alt="union"
                    width={10}
                    height={10}
                    className="m-2"
                    onClick={() => {
                      setArr((prevArr) => {
                        const newArr = [...prevArr]; // prevArr 복사
                        newArr[0] = ""; // 첫 번째 요소를 빈 문자열로 설정
                        return newArr;
                      });
                    }}
                  />
                </button>
              ) : null
            ) : (
              arr.map((item, index) =>
                index !== 0 ? (
                  <button
                    key={item}
                    className="... body-14-m m-1 flex w-fit items-center overflow-hidden text-ellipsis whitespace-nowrap rounded-full bg-primary-50 px-2 pl-3 text-white"
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
                ) : null,
              )
            )}
          </div>

          <h1 className="body-16-m pt-7">
            {props.modalMode === "job" ? "직업" : "분야"}
          </h1>
          <div className="flex h-fit w-full flex-wrap pt-2">
            {props.modalMode === "job"
              ? jobTags.map((item) => (
                  <button
                    key={item.id}
                    className={`body-14-m ... m-1 overflow-hidden text-ellipsis whitespace-nowrap rounded-full border px-2 ${
                      arr[0] === item.name
                        ? "border-primary-50 bg-primary-5 text-primary-50"
                        : "border-secondary-200 text-secondary-400"
                    }`}
                    onClick={() => {
                      setArr((prevArr) => {
                        if (item.name) {
                          const newArr = [...prevArr]; // prevArr 복사
                          newArr[0] = item.name; // 첫 번째 요소를 빈 문자열로 설정
                          return newArr;
                        }
                        return [""];
                      });
                    }}
                  >
                    {item.name}
                  </button>
                ))
              : categoryTags.map((item) => (
                  <button
                    key={item.id}
                    className={`body-14-m ... m-1 overflow-hidden text-ellipsis whitespace-nowrap rounded-full border px-2 ${
                      item.name && arr?.includes(item.name)
                        ? "border-primary-50 bg-primary-5 text-primary-50"
                        : "border-secondary-200 text-secondary-400"
                    }`}
                    onClick={() => {
                      if (item.name) {
                        if (arr.length !== 0) {
                          if (!arr.includes(item.name) && arr.length < 4) {
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
            className="... body-16-s mt-5 w-full rounded-full bg-secondary-900 p-3 text-white"
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
