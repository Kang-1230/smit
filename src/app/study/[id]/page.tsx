import React from "react";
import GroupCalendar from "../components/GroupCalendar";

const StudyGroupPage = ({ params }: { params: { id: string } }) => {
  return (
    <div>
      <GroupCalendar studyId={params.id} />
    </div>
  );
};

export default StudyGroupPage;
