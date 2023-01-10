import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setJobId } from "../../features/auth/authSlice";
import { useJobByIdQuery } from "../../features/job/jobApi";

const JobCard = ({ jobData }) => {
    const navigate = useNavigate();
    const { _id, position, companyName, location, employmentType, applicants } =
        jobData || {};
    console.log(jobData);
    const { data, isLoading, isError } = useJobByIdQuery(_id, { pollingInterval: 5000 });
    const { user } = useSelector(state => state.auth);
    console.log(data)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setJobId(_id))
    }, [])




    if (data?.data?.application?.length && user?.role === 'candidate') {
        return '';
    }

    return (
        <div>
            {<div
                key={_id}
                className='border border-gray-300 shadow-xl p-5 rounded-2xl text-primary'
            >
                <div>
                    <div className='flex justify-between  text-primary'>
                        <div>
                            <p className='text-xl'>{position}</p>
                            <small className='text-primary/70 '>
                                by{" "}
                                <span className='font-semibold hover:text-primary cursor-pointer hover:underline transition-all'>
                                    {companyName}
                                </span>
                            </small>
                        </div>
                        <p>{location}</p>
                    </div>
                    <div className='flex justify-between items-center mt-5'>
                        <p>{employmentType}</p>
                        {user?.role === 'employer' && <p>Applicants: {applicants?.length}</p>}
                        <button className='btn' onClick={() => navigate(`/job-details/${_id}`)}>
                            Details
                        </button>
                    </div>
                </div>
            </div >}
        </div>
    );
};

export default JobCard;