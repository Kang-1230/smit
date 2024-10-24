"use client";

import { useState } from "react";

const LikeButton = ({ postId }: { postId: number }) => {
  const [isLike, setIsLike] = useState(false);

  if (isLike) {
    return <div className="w-5 h-5 rounded-full bg-red-300 "></div>;
  } else {
    return <div className="w-5 h-5 rounded-full border-2 border-red-300"></div>;
  }
};

export default LikeButton;
