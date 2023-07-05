import { useState } from "react";
import { MdClose } from "react-icons/md";
import axios from "axios";

type ModalProps = {
  isOpen?: boolean;
  onClose?: () => void;
  setCheckIfAdded: React.Dispatch<React.SetStateAction<boolean>>;
};

const Modal = ({ isOpen, onClose, setCheckIfAdded }: ModalProps) => {
  const [profile, setProfile] = useState<string>("");
  const [desc, setDesc] = useState<string>("");
  const [exp, setExp] = useState<number>(0);
  const [tech, setTech] = useState<string>("");
  const [techs, setTechs] = useState<string[]>([]);

  const handleAddTech = (e: any) => {
    e.preventDefault();
    setTechs([...techs, tech]);
    setTech("");
  };

  const handleRemoveTech = (index: number) => {
    const newTechs = [...techs];
    newTechs.splice(index, 1);
    setTechs(newTechs);
  };

  const handlePostJob = (e: any) => {
    e.preventDefault();
    const job = {
      profile: profile,
      desc: desc,
      exp: exp,
      techs: techs,
    };
    console.log({ job });
    axios
      .post("https://joblisting-api.onrender.com/job", job)
      .then((response) => {
        if (response.status === 200) {
          alert("Job Posted Successfully");
          setCheckIfAdded((prev) => !prev);
        }
      })
      .catch((error) => {
        alert("Something went wrong");
        console.log({ error });
      });

    setProfile("");
    setDesc("");
    setExp(0);
    setTechs([]);
    onClose?.();
  };

  const handleModalClose = () => {
    setProfile("");
    setDesc("");
    setExp(0);
    setTechs([]);
    onClose?.();
  };

  return (
    <div>
      {isOpen ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed z-50 left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] outline-none focus:outline-none">
            <div className="relative w-auto max-w-[600px]">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-[#DBDFEA] outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-center justify-between p-2 bg-[#8294C4] border-b border-solid border-[#8294C4] rounded-t">
                  <h3 className="font-semibold text-lg">Post a Job</h3>
                  <MdClose
                    className="cursor-pointer"
                    onClick={handleModalClose}
                  />
                </div>
                {/*body*/}
                <div className="relative p-2 flex-auto">
                  <form>
                    <label
                      htmlFor="profile"
                      className="text-xs font-semibold pl-1"
                    >
                      Profile
                    </label>
                    <input
                      className="w-full p-2 rounded-lg pl-4 border-none outline-none"
                      type="text"
                      name="profile"
                      id="profile"
                      placeholder="Job Profile"
                      value={profile}
                      onChange={(e) => setProfile(e.target.value)}
                    />
                    <label
                      htmlFor="desc"
                      className="text-xs font-semibold pl-1 mt-2"
                    >
                      Description
                    </label>
                    <textarea
                      className="w-full p-2 rounded-lg pl-4 border-none outline-none"
                      rows={4}
                      name="desc"
                      id="desc"
                      placeholder="Job Description"
                      value={desc}
                      onChange={(e) => setDesc(e.target.value)}
                    />
                    <label
                      htmlFor="exp"
                      className="text-xs font-semibold pl-1 mt-2"
                    >
                      Experience
                    </label>
                    <input
                      className="w-full p-2 rounded-lg pl-4 border-none outline-none"
                      type="number"
                      max={20}
                      min={0}
                      name="exp"
                      id="exp"
                      placeholder="Experience"
                      value={exp}
                      onChange={(e) => setExp(Number(e.target.value))}
                    />
                    <div className="flex flex-col mt-2">
                      <label
                        htmlFor="techs"
                        className="text-xs font-semibold pl-1"
                      >
                        Add Techs
                      </label>
                      <div className="flex justify-start items-center w-full">
                        <input
                          className="p-2 rounded-lg pl-4 border-none outline-none flex-1"
                          type="text"
                          name="techs"
                          id="techs"
                          placeholder="Technologies"
                          value={tech}
                          onChange={(e) => setTech(e.target.value)}
                        />
                        <button
                          className="py-2 ml-1 px-4 bg-[#ACB1D6] rounded-lg font-semibold"
                          onClick={handleAddTech}
                        >
                          Add
                        </button>
                      </div>
                      <div className="flex flex-wrap">
                        {techs.map((tech, index) => (
                          <div
                            className="bg-[#ACB1D6] rounded-lg px-2 py-1 text-xs font-semibold mr-2 mt-2 group relative"
                            key={index}
                          >
                            {tech}
                            <div
                              className="absolute -top-1 -right-1 bg-black opacity-50 rounded-full hidden group-hover:block cursor-pointer"
                              onClick={() => handleRemoveTech(index)}
                            >
                              <MdClose className="text-white" />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </form>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-2 border-t border-solid border-[#8294C4] rounded-b">
                  <button
                    className="text-[18px] font-semibold rounded-full mr-1 bg-[#ACB1D6] hover:bg-[#FFEAD2] ease-in-out duration-300 py-[5px] px-[1rem]"
                    onClick={handleModalClose}
                  >
                    Close
                  </button>
                  <button
                    className="text-[18px] font-semibold rounded-full mr-1 bg-[#ACB1D6] hover:bg-[#FFEAD2] ease-in-out duration-300 py-[5px] px-[1rem]"
                    onClick={handlePostJob}
                  >
                    Post
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div
            className="opacity-50 fixed inset-0 z-40 bg-black"
            onClick={handleModalClose}
          ></div>
        </>
      ) : null}
    </div>
  );
};

export default Modal;
