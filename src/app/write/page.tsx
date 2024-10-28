"use client";
import Link from "next/link";
import React, { useState } from "react";
import { Tables } from "../../../database.types";

export const Write = () => {
  const [title, setTitle] = useState<string>("");
  const [desription, setDiscription] = useState<string>("");
  const [link, setLink] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const[study,setStudy] = useState<Tables<"study">>();

  const sendData = () => {
    alert("모집글을 성공적으로 작성됨 -> 모집글로 페이지네이션");
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="flex justify-between ... w-full p-5">
        <Link href={"/"}>X</Link>
        <p onClick={() => sendData()}>생성</p>
      </div>
      <h1>제목</h1>
      <input
        className="mb-1 border p-1 rounded-md"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="제목을 작성해주세요."
      />
      <h1>{`시작 예정일 (UI 수정 예정)`}</h1>
      <input
        className="mb-1 border p-1 rounded-md"
        value={desription}
        type="date"
        onChange={(e) => setDiscription(e.target.value)}
        placeholder="0000년 00월 00일"
      />
      <h1>{`스터디 그룹 선택 (UI 수정 예정)`}</h1>
      <input
        className="mb-1 border p-1 rounded-md"
        value={link}
        onChange={(e) => setLink(e.target.value)}
        placeholder="선택해주세요."
      />
      <h1>{`내용 (회의록 UI 수정)`}</h1>
      <input
        className="mb-1 border p-1 rounded-md"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="내용을 작성해주세요"
      />
    </div>
  );
};

export default Write;
