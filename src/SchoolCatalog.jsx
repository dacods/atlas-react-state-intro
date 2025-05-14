import { useEffect, useState } from "react";

export default function SchoolCatalog() {
  const [courses, setCourses] = useState([]);
  const [filter, setFilter] = useState("");
  const [sort, setSort] = useState("trimester");
  const [direction, setDirection] = useState("asc");


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

  const sortedCourses = courses.sort((a, b) => {
    if (sort === "trimester") {
      return a[sort].localeCompare(b.trimester) * (direction === "desc" ? -1: 1);
    }
    if (sort === "courseNumber") {
      return a[sort].localeCompare(b.courseNumber) * (direction === "desc" ? -1 : 1);
    }
    if (sort === "courseName") {
      return a[sort].localeCompare(b.courseName) * (direction === "desc" ? -1 : 1);
    }
    if (sort === "semesterCredits") {
      return a[sort].localeCompare(b.semesterCredits) * (direction === "desc" ? -1 : 1);
    }
    if (sort === "totalClockHours") {
      return a[sort].localeCompare(b.totalClockHours) * (direction === "desc" ? -1 : 1);
    }
  });

  const handleSortingChange = (field) => {
    const sortOrder = sort === field && direction === "asc" ? "desc" : "asc";
    setSort(field);
    setDirection(sortOrder);
  };

  return (
    <div className="school-catalog">
      <h1>School Catalog</h1>
      <input type="text" onChange={(e) => setFilter(e.target.value)} placeholder="Search" />
      <table>
        <thead>
          <tr>
            <th onClick={() => handleSortingChange("trimester")}>Trimester</th>
            <th onClick={() => handleSortingChange("courseNumber")}>Course Number</th>
            <th onClick={() => handleSortingChange("courseName")}>Courses Name</th>
            <th onClick={() => handleSortingChange("semesterCredits")}>Semester Credits</th>
            <th onClick={() => handleSortingChange("totalClockHours")}>Total Clock Hours</th>
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
