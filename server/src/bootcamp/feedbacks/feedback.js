import { db1 } from "../../db.js";

export const GetFeedbacks = async (req, res) => {
    const { date, type } = req.body;
    
    if (!date || !type) {
        return res.json({ error: true, message: "Date and type are mandatory to get feedbacks" });
    }

    try {
        const feedbacks = await db1.collection("Feedbacks").find({ date, type }).toArray();

        if (feedbacks.length === 0) {
            return res.json({ message: "No feedbacks found for the given date and type", error: true });
        }

        res.json({ feedbacks, error: false });
    } catch (error) {
        console.error("Error retrieving feedbacks:", error);
        res.status(500).json({ error: "Failed to retrieve feedbacks" });
    }
}




export const GetUniqueDatesAndLatestFeedbacks = async (req, res) => {
    try {
        // Fetch unique dates and latest feedback for each date for "tech" type
        const uniqueDatesWithLatestTechFeedbacks = await db1.collection("Feedbacks").aggregate([
            { $match: { type: "tech" } },
            { $sort: { date: -1 } },
            {
                $group: {
                    _id: "$date",
                    latestFeedback: { $first: "$$ROOT" }
                }
            },
            {
                $project: {
                    _id: 0,
                    date: "$_id",
                    latestFeedback: 1
                }
            },
            { $sort: { date: -1 } }
        ]).toArray();

        // Fetch unique dates and latest feedback for each date for "site" type
        const uniqueDatesWithLatestSiteFeedbacks = await db1.collection("Feedbacks").aggregate([
            { $match: { type: "site" } },
            { $sort: { date: -1 } },
            {
                $group: {
                    _id: "$date",
                    latestFeedback: { $first: "$$ROOT" }
                }
            },
            {
                $project: {
                    _id: 0,
                    date: "$_id",
                    latestFeedback: 1
                }
            },
            { $sort: { date: -1 } }
        ]).toArray();

        if (uniqueDatesWithLatestTechFeedbacks.length === 0 && uniqueDatesWithLatestSiteFeedbacks.length === 0) {
            return res.json({ message: "No feedbacks found", error: true });
        }

        // Get the latest date from the results for "tech" and "site"
        const latestTechDate = uniqueDatesWithLatestTechFeedbacks[0]?.date;
        const latestSiteDate = uniqueDatesWithLatestSiteFeedbacks[0]?.date;

        // Fetch all feedbacks for the latest tech date
        const feedbacksForLatestTechDate = latestTechDate
            ? await db1.collection("Feedbacks").find({ date: latestTechDate, type: "tech" }).toArray()
            : [];

        // Fetch all feedbacks for the latest site date
        const feedbacksForLatestSiteDate = latestSiteDate
            ? await db1.collection("Feedbacks").find({ date: latestSiteDate, type: "site" }).toArray()
            : [];

        res.json({
            uniqueDatesWithLatestFeedbacks: {
                tech: uniqueDatesWithLatestTechFeedbacks,
                site: uniqueDatesWithLatestSiteFeedbacks,
            },
            feedbacksForLatestDate: {
                tech: feedbacksForLatestTechDate,
                site: feedbacksForLatestSiteDate,
            },
            error: false
        });
    } catch (error) {
        console.error("Error fetching feedbacks:", error);
        res.status(500).json({ error: "Failed to get feedbacks" });
    }
};

