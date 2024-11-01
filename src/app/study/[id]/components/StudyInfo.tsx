import React from 'react'

const StudyInfo = async({studyId} : {studyId : string}) => {
  
  return (
    <div>{studyId + "스터디 정보 표시입니다."}</div>
  )
}

export default StudyInfo