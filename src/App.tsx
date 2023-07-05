import { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import "./App.css";
import Header from "./components/Header";
import DashBoard from "./components/DashBoard";
import Modal from "./components/Modal";

const App = () => {
  const [jobData, setJobData] = useState([]);

  const [modalOpen, setModalOpen] = useState(false);

  const [checkIfAdded, setCheckIfAdded] = useState(false);
  const [loading, setLoading] = useState(false);

  const modalHandler = () => {
    setModalOpen(!modalOpen);
  };

  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      const response = await axios.get(
        "https://joblisting-api.onrender.com/jobs"
      );
      setJobData(response?.data);
      setLoading(false);
    };
    fetchJobs();
  }, [checkIfAdded]);

  return (
    <>
      {ReactDOM.createPortal(
        <Modal isOpen={modalOpen} onClose={modalHandler} setCheckIfAdded={setCheckIfAdded} />,
        document.getElementById("modal") as HTMLElement
      )}
      <div className="bg-[#DBDFEA] bg-cover h-full w-full min-h-[100vh]">
        <Header setJobData={setJobData} setModalOpen={setModalOpen} />
        <DashBoard data={jobData} loading={loading} />
      </div>
    </>
  );
};

export default App;
