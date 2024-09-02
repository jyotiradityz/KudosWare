import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Modal from '@/components/ui/Modal';
import apiClient from '@/lib/api-client';
import { GET_ALL_JOBS, HOST, POST_APPLICATION } from '@/utils/constant';
import { useAppStore } from '@/store';
import { toast } from 'sonner';

const Jobs = () => {
    const [jobs, setJobs] = useState([]);
    const [selectedJob, setSelectedJob] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { userInfo, setUserInfo } = useAppStore();
    const resume = `${HOST}/${userInfo.resume}`
    useEffect(() => {
        const getJobs = async () => {
            try {
                const res = await apiClient.get(GET_ALL_JOBS);
                setJobs(res.data);
            } catch (error) {
                console.log(error);
            }
        };
        getJobs();
    }, []);

    const handleApplyClick = (job) => {
        setSelectedJob(job);
        setIsModalOpen(true);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserInfo({
            ...userInfo,
            [name]: value,
        });
    };

    const handleResumeClick = () => {
        console.log(resume);
        window.open(resume, "_blank");
    };
    // const {userInfo, setUserInfo} = useAppStore();
    const handleSubmit = async () => {
        //job_id, company, title, location, salary, description, image, resume
        const newAppliedJob = {
            job_id: selectedJob._id,
            company: selectedJob.company,
            title: selectedJob.title,
            location: selectedJob.location,
            salary: selectedJob.salary,
            description: selectedJob.description,
            image: selectedJob.image,
            resume: userInfo.resume,
        };
    
        const updatedUserInfo = {
            ...userInfo,
            appliedJobs: [...(userInfo.appliedJobs || []), newAppliedJob],
        };
    
        setUserInfo(updatedUserInfo);
        console.log(newAppliedJob);
        
        console.log(userInfo.appliedJobs);
        
        
        
        const res = await apiClient.post(POST_APPLICATION, {
            job_id: selectedJob._id,
            company: selectedJob.company,
            title: selectedJob.title,
            location: selectedJob.location,
            salary: selectedJob.salary,
            description: selectedJob.description,
            image: selectedJob.image,
            resume: userInfo.resume
        }, { withCredentials: true })

        if (res.status === 200 || res.data) {
            toast.success("Profile Updated Successfully");
            setIsModalOpen(false);
        }
        else{
            toast.error("Failed to Submit Application");
        }
    };

    return (
        <div className='bg-black flex flex-wrap gap-5 m-5 mt-12 justify-around'>
            {jobs.map(job => (
                <div key={job.title} className="max-w-sm bg-[#1b1f20] border border-gray-700 rounded-lg shadow">
                    <div className="relative w-full h-48">
                        <img className="absolute inset-0 w-full h-full object-cover rounded-t-lg" src={job.image} alt={job.title} />
                    </div>
                    <div className="p-5">
                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-white">{job.title}</h5>
                        <p className="mb-3 font-normal text-gray-400">{job.description}</p>
                        <div className="flex justify-between items-center">
                            <a href="#" className="flex items-center text-white">
                                Read more
                                <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                    <path stroke="currentColor" d="M1 5h12m0 0L9 1m4 4L9 9" />
                                </svg>
                            </a>
                            <Button onClick={() => handleApplyClick(job)} className="text-black bg-white hover:bg-gray-200 transition-all duration-300">
                                Apply For this Job
                            </Button>
                        </div>
                    </div>
                </div>
            ))}

            {isModalOpen && (
                <Modal onClose={() => setIsModalOpen(false)}>
                    <div className="p-5 flex gap-10 bg-white rounded-lg">
                        <div className="w-1/3 flex flex-col items-center">
                            <img className="w-40 h-40 object-cover rounded" src={selectedJob?.image} alt={selectedJob?.title} />
                            <h5 className="mt-4 text-2xl font-bold text-black text-center">{selectedJob?.title}</h5>
                            <p className="mt-2 text-gray-700 text-center">{selectedJob?.description}</p>
                            <p className="mt-4 text-gray-900 font-bold text-center">Salary: {selectedJob?.salary}</p>
                        </div>
                        <div className="w-2/3">
                            <h3 className="text-xl font-semibold mb-6 text-black text-center">Apply for {selectedJob?.title}</h3>
                            <div className="flex flex-col gap-4">
                                <Input
                                    className="p-3 rounded-md bg-gray-100 text-black"
                                    name="firstName"
                                    value={userInfo.firstName}
                                    onChange={handleInputChange}
                                    placeholder="Enter your first name"
                                />
                                <Input
                                    className="p-3 rounded-md bg-gray-100 text-black"
                                    name="lastName"
                                    value={userInfo.lastName}
                                    onChange={handleInputChange}
                                    placeholder="Enter your last name"
                                />
                                <Input
                                    className="p-3 rounded-md bg-gray-100 text-black"
                                    name="email"
                                    value={userInfo.email}
                                    onChange={handleInputChange}
                                    placeholder="Enter your email"
                                />
                                <Button
                                    className="text-white-500 hover:text-blue-400 cursor-pointer"
                                    onClick={handleResumeClick}
                                >
                                    Check Your Resume by Clicking Here                                </Button>
                                <Button className="mt-6 w-full bg-black text-white p-3 rounded-md" onClick={handleSubmit}>
                                    Submit Application
                                </Button>
                            </div>
                        </div>
                    </div>
                </Modal>
            )}
        </div>
    );
};

export default Jobs;
