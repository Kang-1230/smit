//ssr, 컴포넌트 분리해서 csr로

import { getUser } from "@/utils/supabase/supabase-server";
import MyStudyList from "./components/MyStudyList";
import WeeklyCalendar from "./components/WeekCalendar";

const page = async () => {
  const user = await getUser();

  return (
    <div>
      <WeeklyCalendar />
      <MyStudyList user={user} />
    </div>
  );
};

export default page;
