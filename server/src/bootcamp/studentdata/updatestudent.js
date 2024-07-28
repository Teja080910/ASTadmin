import { db1 } from "../../db.js"

export const UpdateStudent = async (data, res) => {
    try {
        // const students = await db1.collection("Hackathondata").findOneAndUpdate({ Reg_No: data?.reg }, { $set: { Name: data?.name, Gmail: data?.gmail, Year: data?.year, Branch: data?.branch, Number: data?.number, Score: data?.score } })
        const students = await db1.collection("Hackathondata").findOneAndUpdate({
            $expr: {
                $eq: [
                    {
                        $replaceAll: {
                            input: {
                                $toUpper: {
                                    $replaceAll: { input: "$Reg_No", find: " ", replacement: "" }
                                }
                            },
                            find: " ",
                            replacement: ""
                        }
                    },
                    data?.reg?.toUpperCase().replace(/\s+/g, '')
                ]
            }
        }, { $set: { Name: data?.name, Gmail: data?.gmail, Year: data?.year, Branch: data?.branch, Number: data?.number, Score: data?.score } })
        if (students?.value?.Reg_No) {
            res.json({ message: "update", data: students })
        }
    } catch (error) {
        console.log(error)
    }
}

export const DeleteStudent = async (data, res) => {
    try {
        // const students = await db1.collection("Hackathondata").deleteOne({ Reg_No: data })
        const students = await db1.collection("Hackathondata").deleteOne({
            $expr: {
                $eq: [
                    {
                        $replaceAll: {
                            input: {
                                $toUpper: {
                                    $replaceAll: { input: "$Reg_No", find: " ", replacement: "" }
                                }
                            },
                            find: " ",
                            replacement: ""
                        }
                    },
                    data.toUpperCase().replace(/\s+/g, '')
                ]
            }
        })
        if (students) {
            res.json(students)
        }
    } catch (error) {
        console.log(error)
    }
}