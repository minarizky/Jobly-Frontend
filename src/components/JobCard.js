import React from 'react';

const JobCard = ({ job, applyForJob }) => {
  return (
    <div>
      <h2>{job.title}</h2>
      <p>{job.company}</p>
      <p>{job.description}</p>
      <button onClick={() => applyForJob(job.id)}>Apply</button>
    </div>
  );
};

export default JobCard;

