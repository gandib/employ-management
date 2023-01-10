import React, { useState } from "react";
import { useSelector } from "react-redux";
import JobCard from "../../components/reusable/JobCard";
import Loading from "../../components/reusable/Loading";
import { useGetAppliedJobsQuery } from "../../features/job/jobApi";

const AppliedJobs = () => {
    const {
        user: { email },
    } = useSelector((state) => state.auth);
    const { data, isLoading, isSuccess } = useGetAppliedJobsQuery(email, { pollingInterval: 5000 });
    const [sortValue, setSortValue] = useState('date');
    console.log(data);

    let newData;
    if (sortValue === 'date') {
        newData = data?.data;
    } else {
        newData = data?.data.filter(approved => approved.approvalState);
    }
    console.log(newData);

    if (isLoading) {
        return <Loading />;
    }




    return (
        <div>
            <h1 className='text-xl py-5 font-semibold text-primary'>Applied jobs</h1>
            <div className="flex p-2 items-center">
                <h1 className="pr-1 text-lg font-semibold text-primary">Sort by</h1>
                <select onChange={(e) => setSortValue(e.target.value)} className="border rounded font-semibold text-primary" name="" id="">
                    <option value="date">Date</option>
                    <option value="approval">Approval State</option>
                </select>
            </div>
            <div className='grid grid-cols-2 gap-5 pb-5'>
                {newData?.map((job) => (
                    <JobCard jobData={job} />
                ))}
            </div>
        </div>
    );
};

export default AppliedJobs;