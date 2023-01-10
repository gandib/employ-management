import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useApplyMutation, useCloseMutation, useJobByIdQuery, useQuestionMutation, useReplyMutation, useUserByEmailQuery } from "../features/job/jobApi";
import meeting from "../assets/meeting.jpg";
import { BsArrowRightShort, BsArrowReturnRight } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { useForm } from "react-hook-form";
import { setJobId } from "../features/auth/authSlice";

const JobDetails = () => {
  const [reply, setReply] = useState("");
  const { user } = useSelector(state => state.auth);
  const navigate = useNavigate();
  const { id } = useParams();
  const { register, handleSubmit, reset } = useForm();
  const dispatch = useDispatch();
  const { data, isLoading, isError } = useJobByIdQuery(id, { pollingInterval: 5000 });
  console.log(data?.data, id)
  dispatch(setJobId(id));
  const {
    companyName,
    position,
    location,
    experience,
    workLevel,
    employmentType,
    salaryRange,
    skills,
    requirements,
    responsibilities,
    overview,
    queries,
    _id,
    applicants,
    application,
    approvalState,
  } = data?.data || {};

  const [apply] = useApplyMutation();
  const [sendQuestion] = useQuestionMutation();
  const [sendReply] = useReplyMutation();
  const [closeApplication] = useCloseMutation();

  const handleApply = () => {
    if (user.role === "employer") {
      toast.error("You need a candidate account to apply!");
      return;
    }

    if (user.role === "") {
      navigate("/register");
      return;
    }

    const data = {
      userId: user._id,
      email: user.email,
      jobId: _id,
    };
    apply(data);
  };

  const handleQuestion = (data) => {
    const queData = {
      ...data,
      userId: user._id,
      email: user.email,
      jobId: _id,
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

  const handleClosePosition = () => {
    const data = {
      jobId: _id,
    }
    closeApplication(data);
    console.log('close')
  }
  console.log(application);

  const appliedJob = applicants.filter(job => job.email === user?.email);
  console.log(appliedJob)

  return (
    <div className='pt-14 grid grid-cols-12 gap-5'>
      <div className='col-span-9 mb-10'>
        <div className='h-80 rounded-xl overflow-hidden'>
          <img className='h-full w-full object-cover' src={meeting} alt='' />
        </div>
        <div className='space-y-5'>
          <div className='flex justify-between items-center mt-5'>
            <h1 className='text-xl font-semibold text-primary'>{position}</h1>

            {user?.role === 'employer' && !application && <button onClick={handleClosePosition} className='px-4 py-2 border border-primary text-primary rounded-full hover:bg-primary hover:text-white transition-all hover:px-6 disabled:text-gray-300 disabled:border-gray-300 disabled:hover:px-4 disabled:hover:bg-transparent'>Close Position</button>}

            {approvalState && <button className='px-4 py-2 border border-primary text-primary rounded-full hover:bg-primary hover:text-white transition-all hover:px-6 disabled:text-gray-300 disabled:border-gray-300 disabled:hover:px-4 disabled:hover:bg-transparent cursor-not-allowed'>Job Granted</button>}

            {user?.role === 'employer' && application && <button className='px-4 py-2 border border-red-600 text-red-600 bg-white cursor-not-allowed rounded-full '>Closed</button>}

            {!application && appliedJob.length !== 1 && <button onClick={handleApply} className='px-4 py-2 border border-primary text-primary rounded-full hover:bg-primary hover:text-white transition-all hover:px-6 disabled:text-gray-300 disabled:border-gray-300 disabled:hover:px-4 disabled:hover:bg-transparent'>Apply</button>}

            {!application && appliedJob.length === 1 && <button className='px-4 py-2 border border-primary text-primary rounded-full hover:bg-primary hover:text-white transition-all hover:px-6 disabled:text-gray-300 disabled:border-gray-300 disabled:hover:px-4 disabled:hover:bg-transparent cursor-not-allowed'>Applied</button>}
          </div>
          <div>
            <h1 className='text-primary text-lg font-medium mb-3'>Overview</h1>
            <p>{overview}</p>
          </div>
          <div>
            <h1 className='text-primary text-lg font-medium mb-3'>Skills</h1>
            <ul>
              {skills?.map((skill) => (
                <li className='flex items-center'>
                  <BsArrowRightShort /> <span>{skill}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h1 className='text-primary text-lg font-medium mb-3'>
              Requirements
            </h1>
            <ul>
              {requirements?.map((skill) => (
                <li className='flex items-center'>
                  <BsArrowRightShort /> <span>{skill}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h1 className='text-primary text-lg font-medium mb-3'>
              Responsibilities
            </h1>
            <ul>
              {responsibilities?.map((skill) => (
                <li className='flex items-center'>
                  <BsArrowRightShort /> <span>{skill}</span>
                </li>
              ))}
            </ul>
          </div>
          {user?.role === 'employer' && <div>
            <h1 className='text-primary text-lg font-medium mb-3'>
              Applicants
            </h1>
            <ul>
              {applicants?.map((applicant) => (
                <li onClick={() => navigate(`/user-detail/${applicant.email}`)} className='flex items-center text-lg'>
                  <BsArrowRightShort /><span className="mr-2 cursor-pointer">Click to show detail & Chat with Candidate</span> <span className="underline text-green-500 cursor-pointer"> {applicant.email}</span>
                </li>
              ))}
            </ul>
          </div>}
          {user?.role === 'candidate' && <li>
            <Link
              className='border border-black px-2 py-1 rounded-full hover:border-primary hover:text-white hover:bg-primary hover:px-4 transition-all '
              to={`/user-detail/${user?.email}`}
            >
              Chat with Employer
            </Link>
          </li>}
        </div>
        <hr className='my-5' />
        <div>
          <div>
            <h1 className='text-xl font-semibold text-primary mb-5'>
              General Q&A
            </h1>
            <div className='text-primary my-2'>
              {queries?.map(({ question, email, reply, id, _id }) => (
                <div>
                  <small>{email}</small>
                  <p className='text-lg font-medium'>{question}</p>
                  {reply?.map((item) => (
                    <p className='flex items-center gap-2 relative left-5'>
                      <BsArrowReturnRight /> {item}
                    </p>
                  ))}

                  {user.role === "employer" && <div className='flex gap-3 my-5'>
                    <input placeholder='Reply'
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

            {user.role === "candidate" && <form onSubmit={handleSubmit(handleQuestion)}>
              <div className='flex gap-3 my-5'>
                <input
                  placeholder='Ask a question...'
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
        </div>
      </div>
      <div className='col-span-3'>
        <div className='rounded-xl bg-primary/10 p-5 text-primary space-y-5'>
          <div>
            <p>Experience</p>
            <h1 className='font-semibold text-lg'>{experience}</h1>
          </div>
          <div>
            <p>Work Level</p>
            <h1 className='font-semibold text-lg'>{workLevel}</h1>
          </div>
          <div>
            <p>Employment Type</p>
            <h1 className='font-semibold text-lg'>{employmentType}</h1>
          </div>
          <div>
            <p>Salary Range</p>
            <h1 className='font-semibold text-lg'>{salaryRange}</h1>
          </div>
          <div>
            <p>Location</p>
            <h1 className='font-semibold text-lg'>{location}</h1>
          </div>
        </div>
        <div className='mt-5 rounded-xl bg-primary/10 p-5 text-primary space-y-5'>
          <div>
            <h1 className='font-semibold text-lg'>{companyName}</h1>
          </div>
          <div>
            <p>Company Size</p>
            <h1 className='font-semibold text-lg'>Above 100</h1>
          </div>
          <div>
            <p>Founded</p>
            <h1 className='font-semibold text-lg'>2001</h1>
          </div>
          <div>
            <p>Email</p>
            <h1 className='font-semibold text-lg'>company.email@name.com</h1>
          </div>
          <div>
            <p>Company Location</p>
            <h1 className='font-semibold text-lg'>Los Angeles</h1>
          </div>
          <div>
            <p>Website</p>
            <a className='font-semibold text-lg' href='#'>
              https://website.com
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;
