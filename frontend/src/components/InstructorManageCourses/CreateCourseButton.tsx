import { useNavigate } from "react-router-dom"

export default function CreateCourseButton({ instructorId }: any) {

  const navigate = useNavigate()

  return (
    <div style={{display:"flex",justifyContent:"flex-end"}}>

      <button
        onClick={() =>
          navigate(`/instructor/${instructorId}/course/create`)
        }
      >
        + Create Course
      </button>

    </div>
  )
}