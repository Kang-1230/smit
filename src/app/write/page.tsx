"use client";

import { useState } from "react";

export default function WritePage() {
  const [studyName, setStudyName] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // 스터디 생성 데이터를 서버로 전송하는 예시
    try {
      const response = await fetch("/api/study", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: studyName,
          description,
        }),
      });

      if (response.ok) {
        alert("스터디가 성공적으로 생성되었습니다!");
        // 필요하다면 폼 초기화 또는 다른 처리
        setStudyName("");
        setDescription("");
      } else {
        alert("스터디 생성에 실패했습니다.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("서버 오류가 발생했습니다.");
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">스터디 생성</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2" htmlFor="studyName">
            스터디 이름
          </label>
          <input
            id="studyName"
            type="text"
            value={studyName}
            onChange={(e) => setStudyName(e.target.value)}
            className="border rounded px-3 py-2 w-full"
            placeholder="스터디 이름을 입력하세요"
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-sm font-medium mb-2"
            htmlFor="description"
          >
            설명
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border rounded px-3 py-2 w-full"
            placeholder="스터디에 대한 설명을 입력하세요"
            required
          ></textarea>
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          스터디 생성
        </button>
      </form>
    </div>
  );
}
