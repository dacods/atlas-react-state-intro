import SchoolCatalog from "./SchoolCatalog";
import Header from "./Header";
import ClassSchedule from "./ClassSchedule";
import { useState, createContext } from "react";

export const EnrolledContext = createContext()

export default function App() {
  const [enrolled, setEnrolled] = useState([])

  const enrollCourse = (course) => {
    setEnrolled((prev) => [...prev, course]);
  };

  const dropCourse = (courseNumber) => {
    setEnrolled((prev) => prev.filter(course => course.courseNumber !== courseNumber));
  };

  return (
    <EnrolledContext.Provider value={{ enrolled, enrollCourse, dropCourse }}>
      <div>
        <Header />
        <SchoolCatalog />
        <ClassSchedule />
      </div>
    </EnrolledContext.Provider>
  );
}
