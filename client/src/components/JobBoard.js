import JobList from './JobList';
import {getJobs} from '../graphql/queries'
import {useEffect, useState} from "react";

function JobBoard() {

    const [jobs,setJobs] = useState([]);
    const [errors, setErrors] = useState(false);

    useEffect(() =>
        {
            getJobs().then(jobs=> setJobs(jobs))
                .catch(err => setErrors(true));
        }
    ,[]);

    console.log("[JobBoard] jobs:",jobs)

  if (errors){
      console.log(errors)
      return <p>Sorry something went wrong, motherfucker</p>
  }
  return (
    <div>
      <h1 className="title">
        Job Board
      </h1>
      <JobList jobs={jobs} />
    </div>
  );
}

export default JobBoard;
