import AppliedJobs from "../models/AppliedJobs.js";


export const addCandidate = async (req, res, next) => {
    try {
        const { job_id, company, title, location, salary, description, image, resume } = req.body;
        if (!job_id || !company || !title || !location || !salary || !description || !image || !resume) {
            return res.status(400).send("All Fields are required");
        }
        const candidate = await AppliedJobs.create({
            job_id, company, title, location, salary, description, image, resume,
        });

        return res.status(201).json(candidate);

    } catch (err) {
        console.log(err);
        return res.status(500).send("Internal Server Error");
    }
}