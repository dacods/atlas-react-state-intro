import { useEffect, useState } from "react";

export default function SchoolCatalog() {
  const [courses, setCourses] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
      fetch('/api/courses.json').then(res => {
        return res.json();
      })
      .then(setCourses)
    }, []);

  const filteredCourses = courses.filter(course => {
    const q = filter.toLowerCase();
    return (
      course.courseNumber.toLowerCase().includes(q) || course.courseName.toLowerCase().includes(q)
    );
  });

  return (
    <div className="school-catalog">
      <h1>School Catalog</h1>
      <input type="text" onChange={(e) => setFilter(e.target.value)} placeholder="Search" />
      <table>
        <thead>
          <tr>
            <th>Trimester</th>
            <th>Course Number</th>
            <th>Courses Name</th>
            <th>Semester Credits</th>
            <th>Total Clock Hours</th>
            <th>Enroll</th>
          </tr>
        </thead>
        <tbody>
          {filteredCourses.map(course => (
            <tr key={course.courseNumber}>
              <td>{course.trimester}</td>
              <td>{course.courseNumber}</td>
              <td>{course.courseName}</td>
              <td>{course.semesterCredits}</td>
              <td>{course.totalClockHours}</td>
              <td>
                <button>Enroll</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        <button>Previous</button>
        <button>Next</button>
      </div>
    </div>
  );
}
