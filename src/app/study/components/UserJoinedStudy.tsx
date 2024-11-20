import React from "react";
import { ApplyData } from "./MyStudyList";

import StudyCard from "./StudyCard";

const UserJoinedStudy = ({
  joinedStudyData,
}: {
  joinedStudyData: ApplyData[] | undefined;
}) => {
  return (
    <section className="scroll-py-2 flex-col gap-5">
      {joinedStudyData?.map((dataItem: ApplyData, i) => {
        if (!joinedStudyData) return null;
        return (
          <StudyCard key={dataItem.study_id} dataItem={dataItem.study} i={i} />
        );
      })}
    </section>
  );
};

export default UserJoinedStudy;
