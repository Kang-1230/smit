"use client";

import React, { useEffect, useState } from "react";
import { Tables } from "../../../../../database.types";
import browserClient from "@/utils/supabase/client";
import MemberImg from "./MemberImg";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

export type profileInfo = {
  user_id: string;
  profile_img: string;
};

const StudyInfo = ({
  study,
  member,
}: {
  study: Tables<"study"> | null;
  member: string[] | null;
}) => {
  const [memberProfile, setMemberProfile] = useState<Tables<"user">[] | null>(
    null,
  );

  useEffect(() => {
    if (member) {
      const getUserProfile = async () => {
        const { data } = await browserClient
          .from("user")
          .select("*")
          .in("id", member);
        setMemberProfile(data);
      };
      getUserProfile();
    }
  }, []);

  if (!study) {
    return <div>로딩 중...</div>;
  }

  return (
    <div className="flex w-full flex-col items-center justify-center">
      <h1 className="title-24-b mb-2">{study.study_name}</h1>
      <p className="body-14-r mb-6 text-secondary-200">
        {study.study_description}
      </p>

      <div className="flex w-full items-center justify-center">
        <Swiper
          modules={[Navigation]}
          slidesPerView={4}
          spaceBetween={-50} // 간격을 1로 설정 (너무 작은 값도 설정 가능)
          navigation={true} // 네비게이션 버튼 활성화
          className="mb-7 w-full items-center justify-center"
        >
          {memberProfile?.map((user) => (
            <SwiperSlide key={user.id}>
              <MemberImg user={user} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      {/* 네비게이션 버튼 커스터마이즈 스타일 */}
      <style jsx global>{`
        .swiper-button-next,
        .swiper-button-prev {
          color: #cccccc;
        }

        .swiper-button-next::after,
        .swiper-button-prev::after {
          font-size: 16px; /* 아이콘 크기 */
        }

        .swiper-slide {
          padding-left: 50px; /* 슬라이드 내부 요소들의 간격을 줄이기 위한 패딩 감소 */
          padding-right: 50px;
        }

        .swiper-slide .member-img-wrapper {
          padding: 5px; /* 내부 요소들 간격 줄이기 */
        }
      `}</style>
    </div>
  );
};

export default StudyInfo;
