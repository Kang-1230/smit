"use client";

import GroupCalendar from "../components/GroupCalendar";

const Page = ({ params }: { params: { id: string } }) => {
  return (
    <div>
      <GroupCalendar studyId={params.id} />
    </div>
  );
};
export default Page;
