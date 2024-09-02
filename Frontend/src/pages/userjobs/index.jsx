import React from 'react';
import Navbar from '../job/components/navbar';
import { useAppStore } from '@/store';
import { Button } from '@/components/ui/button';

const JobUser = () => {
    const { userInfo } = useAppStore();
    const appliedJobs = userInfo.appliedJobs || [];

    return (
        <div className="min-h-screen bg-black text-white">
            <Navbar />
            <div className="container mx-auto py-12 px-4">
                <h1 className="text-3xl font-bold mb-8">Applied Jobs</h1>
                {appliedJobs.length > 0 ? (
                    <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                        {appliedJobs.map((job) => (
                            <div key={job.job_id} className="bg-[#1b1f20] border border-gray-700 rounded-lg shadow-lg overflow-hidden">
                                <div className="relative w-full h-48">
                                    <img 
                                        className="absolute inset-0 w-full h-full object-cover" 
                                        src={job.image} 
                                        alt={job.title} 
                                    />
                                </div>
                                <div className="p-5">
                                    <h5 className="mb-2 text-2xl font-bold tracking-tight">{job.title}</h5>
                                    <p className="mb-4 text-gray-400">{job.description}</p>
                                    <div className="flex justify-between items-center mb-4">
                                        <p className="text-gray-400">Location: {job.location}</p>
                                        <p className="text-gray-400">Salary: {job.salary}</p>
                                    </div>
                                    <Button className="text-black bg-white hover:bg-gray-200 transition-all duration-300 w-full">
                                        View Application Details
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="flex justify-center items-center min-h-[50vh]">
                        <p className="text-xl text-gray-400">You haven't applied to any jobs yet.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default JobUser;
