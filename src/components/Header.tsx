import { useState } from "react";
import axios from "axios";

type Props = {
  setJobData: React.Dispatch<React.SetStateAction<never[]>>;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const Header = ({ setJobData, setModalOpen }: Props) => {
  const [search, setSearch] = useState("");
  const [isEmpty, setIsEmpty] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setIsEmpty(false);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(search === "") {
      setIsEmpty(true);
      return;
    }
    try {
      const fetchJobs = async () => {
        const response = await axios.get(
          `https://joblisting-api.onrender.com/jobs/${search}`
        );
        setJobData(response?.data);
        // console.log(response?.data);
      };
      fetchJobs();
    } catch (err) {
      console.log(err);
    }
    setSearch("");
  };
  return (
    <header className="w-full h-20 bg-[#8294C4] px-20 flex items-center justify-between">
      <h1 className="text-[30px] font-bold">Job Listings</h1>
      <div className="flex items-center justify-center">
        <button
          className="text-[18px] font-semibold rounded-full mr-1 bg-[#ACB1D6] hover:bg-[#FFEAD2] ease-in-out duration-300 py-[5px] px-[1rem]"
          onClick={() => setModalOpen(true)}
        >
          Post a Job
        </button>
        <form onSubmit={handleSubmit} className="relative">
          {isEmpty && (
            <p className="text-xs text-red-500 font-semibold absolute -bottom-4 left-4">
              Please enter a keyword
            </p>
          )}
          <input
            className={`p-2 rounded-full pl-4 pr-[82px] border-none outline-none ${isEmpty? 'bg-red-200' : 'bg-[#FFEAD2]'} w-[300px]`}
            type="text"
            name="search"
            id="search"
            placeholder="Search for keywords"
            value={search}
            onChange={handleChange}
          />
          <button
            type="submit"
            className="p-[5px] bg-[#ACB1D6] font-semibold rounded-full w-[80px] ml-[-82px] z-1"
          >
            Search
          </button>
        </form>
      </div>
    </header>
  );
};

export default Header;
