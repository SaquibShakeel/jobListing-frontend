import { useEffect } from "react";
import JobCard from "./JobCard";
import { BallTriangle } from "react-loader-spinner";

type Job = {
  profile: string;
  desc: string;
  exp: number;
  techs: string[];
};

type Prop = {
  data: Job[];
  loading: boolean;
};

const DashBoard = (props: Prop) => {
  useEffect(() => {}, [props.data]);

  if (props.loading)
    return (
      <div className="flex items-center justify-center h-[80vh]">
        <BallTriangle color="#8294C4" height={100} width={100} />
      </div>
    );

  if (props.data.length === 0)
    return (
      <div className="flex items-center justify-center h-[80vh]">
        <h1 className="text-[30px] font-bold">No Jobs Found</h1>
      </div>
    );

  return (
    <div className="sm:px-20 px-5 grid sm:grid-cols-2 grid-cols-1 items-start gap-10 py-10">
      {props?.data?.map((job, index) => (
        <JobCard key={index} job={job} />
      ))}
    </div>
  );
};

export default DashBoard;
