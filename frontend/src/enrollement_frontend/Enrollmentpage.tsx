import { useState } from "react";
import axios from "axios";

function EnrollmentPage() {

  const [form, setForm] = useState({
    full_name: "",
    email: "",
    password: ""
  });

  const course = {
    course_id: 1,
    course_name: "Sample Course"
  };

  const handleChange = (e: any) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const data = {
      ...form,
      course_id: course.course_id
    };

    try {
      await axios.post(
        "http://localhost:3000/enrollment/register",
        data
      );

      alert("Enrollment Successful!");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>

      <nav style={{display:"flex",gap:"20px"}}>
        <h3>My Courses</h3>
        <h3>Performance</h3>
        <h3>Profile</h3>
      </nav>

      <h2>{course.course_name}</h2>

      <form onSubmit={handleSubmit}>

        <input
          name="full_name"
          placeholder="Full Name"
          onChange={handleChange}
        />

        <br/><br/>

        <input
          name="email"
          placeholder="Email"
          onChange={handleChange}
        />

        <br/><br/>

        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
        />

        <br/><br/>

        <button type="submit">
          Enroll Now
        </button>

      </form>

    </div>
  );
}

export default EnrollmentPage;