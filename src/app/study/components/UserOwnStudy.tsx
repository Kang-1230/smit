import { Tables } from "../../../../database.types";

import StudyCard from "./StudyCard";
import OnePersonStudyCard from "../components/OnePersonStudyCard";

const UserOwnStudy = ({
  myStudyData,
}: {
  myStudyData: Tables<"study">[] | undefined;
}) => {
  return (
    <section className="scroll-py-2 flex-col gap-5 md:ml-[20px] md:flex md:flex-row">
      {myStudyData?.map((dataItem: Tables<"study">, i) => {
        return (
          <>
            {dataItem.study_max_people === 1 ? (
              <OnePersonStudyCard dataItem={dataItem} />
            ) : (
              <StudyCard dataItem={dataItem} i={i} />
            )}
          </>
        );
      })}
    </section>
  );
};

export default UserOwnStudy;
