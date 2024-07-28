import { db1 } from "../../db.js";

export const AttendStudent = async (reg, res) => {
    const date = new Date()
    let day;
    try {
        // const user = await db1.collection("Hackathondata").findOne({ Reg_No: reg })
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
        if (user?.Date !== date.toDateString()) {
            if (user?.AttendDays) {
                day = parseInt(user?.AttendDays) + 1;
            } else {
                day = 1;
            }
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
            }, { $set: { Date: date.toDateString(), AttendDays: day, AttendTime: user?.AttendTime ? [...user?.AttendTime, date] : [date] } })
            if (attend?.value) {
                res.json({ message: "attend", data: attend })
            }
        }
    } catch (error) {
        console.log(error)
    }
}

export const AbsentStudent = async (reg, res) => {
    const date = new Date()
    let day;
    try {
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
        if (user?.Date === date.toDateString()) {
            if (user?.AttendDays) {
                day = parseInt(user?.AttendDays) - 1;
            } else {
                day = 1;
            }
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
            }, { $set: { Date: " ", AttendDays: day } })
            if (attend?.value) {
                res.json({ message: "absent", data: attend })
            }
        }
    } catch (error) {
        console.log(error)
    }
}
