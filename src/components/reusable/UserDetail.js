import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { BsArrowReturnRight, BsArrowRightShort } from 'react-icons/bs';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from "react-router-dom";
import { useApprovalMutation, useChatQuestionMutation, useChatReplyMutation, useJobByIdQuery, useUserByEmailQuery } from '../../features/job/jobApi';

const UserDetail = () => {
    const { user, jobId } = useSelector(state => state.auth);
    const navigate = useNavigate();
    const { id } = useParams();
    const { register, handleSubmit, reset } = useForm();
    const [reply, setReply] = useState("");
    const { data: userData } = useUserByEmailQuery(id);
    console.log(userData, id, jobId);

    const { _id, address, city, country, email, firstName, lastName, gender, postcode, role, companyCategory, companyName, employeeRange, roleInCompany, } =
        userData?.data || {};

    const { data, isLoading, isError } = useJobByIdQuery(jobId, { pollingInterval: 5000 });
    const [sendQuestion] = useChatQuestionMutation();
    const [sendReply] = useChatReplyMutation();
    const [setApproval] = useApprovalMutation();
    const { chatQueries, approvalState } = data?.data || {};
    console.log(chatQueries, approvalState);


    const handleQuestion = (data) => {
        const queData = {
            ...data,
            userId: user._id,
            email: user.email,
            jobId: jobId,
        };
        sendQuestion(queData);
        reset();
    };

    const handleReply = (id) => {
        const data = {
            reply,
            userId: id,
        };
        sendReply(data);
    };

    const approveApplicant = () => {
        const approvalData = {
            userId: user._id,
            email: user.email,
            jobId: jobId,
            approval: 'approved',
        };
        setApproval(approvalData);
    };

    return (
        <div>
            <div
                key={_id}
                className=' items-center flex justify-center  pt-32  p-5 rounded-2xl text-primary'
            >
                <div className=' text-primary'>
                    <div>
                        <p className='text-3xl'>{firstName} {lastName}</p>
                        <small className='text-primary/70 text-sm'>
                            email:{" "}
                            <span className='font-semibold hover:text-primary cursor-pointer hover:underline transition-all'>
                                {email}
                            </span>
                        </small>
                    </div>
                    <p className={`uppercase italic font-bold underline mt-5 `}>{role}</p>
                    <div className='flex mt-2'>
                        <p className='mr-1'>Address: {address}, </p>
                        <p className='mr-1'> {city},</p>
                        <p className='mr-1'>postcode-{postcode},</p>
                        <p className='mr-1'>{country}.</p>
                    </div>
                    <p>Gender: {gender}</p>
                    <p className='text-lg font-bold'>Approval State: {`${approvalState ? 'Job Granted' : 'Under Processing'}`}</p>
                    {user?.role === 'employer' && !approvalState && <button onClick={approveApplicant} className='mt-4 px-4 py-2 border border-primary text-primary rounded-full hover:bg-primary hover:text-white transition-all hover:px-6 disabled:text-gray-300 disabled:border-gray-300 disabled:hover:px-4 disabled:hover:bg-transparent'>Approve Applicant</button>}

                    {user?.role === 'employer' && approvalState && <button className='mt-4 px-4 py-2 border border-primary text-primary rounded-full hover:bg-primary hover:text-white transition-all hover:px-6 disabled:text-gray-300 disabled:border-gray-300 disabled:hover:px-4 disabled:hover:bg-transparent cursor-not-allowed'>Approved</button>}
                </div>
            </div>


            <div>
                <h1 className='flex justify-center text-xl font-semibold text-primary mb-5'>
                    Chat Between Employee and Candidate
                </h1>
                <div className='text-primary my-2'>
                    {chatQueries?.map(({ question, email, reply, id, _id }) => (
                        <div>
                            <small>{email}</small>
                            <p className={`text-lg font-medium `}>{question}</p>
                            {reply?.map((item) => (
                                <p className='flex items-center gap-2 relative left-5 text-green-600'>
                                    <BsArrowReturnRight /> {item}
                                </p>
                            ))}

                            {user.role === "employer" && <div className='flex gap-3 my-5'>
                                <input placeholder='Message Reply'
                                    type='text'
                                    className='w-full'
                                    onBlur={(e) => setReply(e.target.value)}
                                />
                                <button
                                    className='shrink-0 h-14 w-14 bg-primary/10 border border-primary hover:bg-primary rounded-full transition-all  grid place-items-center text-primary hover:text-white'
                                    type='button'
                                    onClick={() => handleReply(_id)}
                                >
                                    <BsArrowRightShort size={30} />
                                </button>
                            </div>}
                        </div>
                    ))}
                </div>

                {user.role === "candidate" && chatQueries && <form onSubmit={handleSubmit(handleQuestion)}>
                    <div className='flex gap-3 my-5'>
                        <input
                            placeholder='Message'
                            type='text'
                            className='w-full'
                            {...register("question")}
                        />
                        <button
                            className='shrink-0 h-14 w-14 bg-primary/10 border border-primary hover:bg-primary rounded-full transition-all  grid place-items-center text-primary hover:text-white'
                            type='submit'
                        >
                            <BsArrowRightShort size={30} />
                        </button>
                    </div>
                </form>}
            </div>
        </div >
    );
};

export default UserDetail;