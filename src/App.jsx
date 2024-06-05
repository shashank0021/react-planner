import { useState, useEffect } from "react";
import SubjectDetails from "./componet/SubjectDetails";



function App() {
  const [subject, setSubject] = useState("");
  const [hour, setHour] = useState("");

  const [subjects, setSubjects] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();

    let copyArray = [...subjects];
    copyArray.push({
      subject: subject,
      hour: parseInt(hour),
    });

    setSubjects(copyArray);
  };

  const increaseHour = (index) => {
    let copyArray = [...subjects];
    copyArray[index]["hour"] += 1;
    setSubjects(copyArray);
  };

  const decreaseHour = (index) => {
    let copyArray = [...subjects];
    copyArray[index]["hour"] -= 1;
    setSubjects(copyArray);
  };

  useEffect(() => {
    if (subjects.length > 0)
      localStorage.setItem("subject", JSON.stringify(subjects));
  }, [subjects]);

  useEffect(() => {
    if (localStorage.getItem("subject")) {
      let array = JSON.parse(localStorage.getItem("subject"));
      setSubjects(array);
    }
  }, []);

  return (
    <div>
      <h1>Geekster Education Planner</h1>
      <form onSubmit={handleSubmit}>
        <input
          required
          onChange={(e) => setSubject(e.currentTarget.value)}
          type="text"
          placeholder="Subject"
        />
        <br />
        <input
          required
          onChange={(e) => setHour(e.currentTarget.value)}
          type="number"
          placeholder="Hour"
        />
        <br />
        <input type="submit" value="Add" />
      </form>

      {subjects.map((item, index) => (
        <div className="plan">
        <SubjectDetails
          increase={increaseHour}
          decrease={decreaseHour}
          subject={item.subject}
          hour={item.hour}
          index={index}
        />
        </div>
      ))}
    </div>
  );
}

export default App;