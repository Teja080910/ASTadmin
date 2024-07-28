import { db1 } from '../../db.js';
export const InternalMarks = async (reg, mark, res) => {
    try {
        let marks;
        const user = await db1.collection("Hackathondata").findOne({
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
                    reg.toUpperCase().replace(/\s+/g, '')
                ]
            }
        })
        if (user?._id) {
            marks = parseInt(mark) + parseInt(user?.InternalMarks || 0)
            const attend = await db1.collection("Hackathondata").findOneAndUpdate({
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
                        reg.toUpperCase().replace(/\s+/g, '')
                    ]
                }
            }, { $set: { InternalMarks: marks } })
            if (attend?.value) {
                res.json({ message: "update", data: attend })
            } else {
                res.send({ error: 'try again' })
            }
        } else {
            res.send({ error: "user not found" })
        }
    } catch (error) {
        console.log(error)
    }
}

export const ActivityMarks = async (reg, mark, res) => {
    try {
        let marks;
        const user = await db1.collection("Hackathondata").findOne({
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
                    reg.toUpperCase().replace(/\s+/g, '')
                ]
            }
        })
        if (user?._id) {
            marks = parseInt(mark) + parseInt(user?.ActivityMarks || 0)
            const attend = await db1.collection("Hackathondata").findOneAndUpdate({
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
                        reg.toUpperCase().replace(/\s+/g, '')
                    ]
                }
            }, { $set: { ActivityMarks: marks } })
            if (attend?.value) {
                res.json({ message: "update", data: attend })
            } else {
                res.send({ error: 'try again' })
            }
        } else {
            res.send({ error: "user not found" })
        }
    } catch (error) {
        console.log(error)
    }
}