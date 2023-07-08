type JobCardProps = {
  job: Job;
};

type Job = {
  profile: string;
  desc: string;
  exp: number;
  techs: string[];
};

const JobCard = (props: JobCardProps) => {
  const { profile, desc, exp, techs } = props.job;
  return (
    <div className="border-2 rounded-lg p-5 w-full bg-[#FFEAD2] shadow-md">
      <div className="flex items-center justify-between">
        <div className="sm:text-[24px] text-lg font-semibold">{profile}</div>
        <div className="text-[#8294C4] font-semibold shrink-0">{exp}+ years</div>
      </div>
      <div className="my-3">
        <span className="font-semibold">Desc:</span>
        <p className="text-[14px]">{desc}</p>
      </div>
      <div className="flex flex-wrap">
        <span className="font-semibold">Tech:</span>
        {techs.map((tech, index) => (
          <div key={index} className="px-1 text-[14px] flex items-end shrink-0">
            {` ${tech}, `}
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobCard;
