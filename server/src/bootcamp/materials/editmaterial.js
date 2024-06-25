import { db1 } from "../../db.js"

export const EditMaterial = async (theme, res) => {
    try {
        const file = await db1.collection("Materials").findOne({ Theme: theme })
        if (file?._id) {
            const updatefile = await db1.collection("Materials").findOneAndUpdate({ Theme: theme }, { $set: { Show: file?.Show ? false : true } })
            if (updatefile?.value) {
                res.json({message:updatefile?.value?.Show?"show":"hide"})
            } else{
                res.json({error:'try again'})
            }
        }else{
            res.json({error:'theme not found'})
        }
    } catch (error) {
        console.log(error)
    }
}