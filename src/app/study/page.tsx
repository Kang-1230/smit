// import { useState } from "react";
// import { createClient } from "../../utils/supabase/client";

const page = () => {
  //   const supabase = createClient();

  //   const [userId, setUserId] = useState("");

  //유저 정보 가져오기

  //스터디 신청 데이터 가져오기
  //   const getStudyApplyList = async () => {
  //     const { data, error } = await supabase
  //       .from("study_applylist")
  //       .select("user_point")
  //       .eq("user_id", userId);
  //     console.log("포인트 데이터", data);
  //     if (error) {
  //       console.error("Error fetching data getPoint : ", error.message);
  //     } else if (data) {
  //       console.log("유저 포인트 데이터 test", data[0]?.user_point);
  //       setPoints(data[0]?.user_point);
  //     }
  //   };

  return <div>page</div>;
};

export default page;
