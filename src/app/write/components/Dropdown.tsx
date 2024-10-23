"use client";

export default function Dropdown() {
  return (
    <div>
      <input onBlur={() => console.log("blur!!")} />
    </div>
  );
}
