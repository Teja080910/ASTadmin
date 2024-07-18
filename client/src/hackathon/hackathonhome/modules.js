import { Actions } from "../../actions/actions"

export const Modules = {
    data: async () => {
        return await Actions.TeamsCodes()
            .then((res) => { return (res?.data) })
            .catch((e) => console.log(e))
    },

    Score: async () => {
        const data = await Modules.data();
        const filterData = data?.filter(student => student?.Rounds);
        const marks = filterData?.map(student => {
            let totalMarks = 0;
            Object.values(student?.Rounds)?.forEach(tasks => {
                totalMarks += parseInt(tasks?.Marks || 0);
            });
            return { Name: student?.Team, Code: student?.TeamCode, Marks: totalMarks };
        });
        return marks.sort((a, b) => b.Marks - a.Marks);
    },

    Overall: async () => {
        const data = await Modules.data();
        const marks = data?.map(student => {
            let totalMarks = 0;
            let total = 0;
            student?.Tasks && Object.values(student?.Rounds)?.forEach(tasks => {
                totalMarks += parseInt(tasks?.Marks || 0);
            });
            total = parseInt(totalMarks) + parseInt(student?.HackActivityMarks || 0) + parseInt(student?.HackInternalMarks || 0)
            return { Name: student?.Team, Code: student?.TeamCode, Total: total };
        });
        return marks.sort((a, b) => b.Total - a.Total);
    },

    Internals: async () => {
        const data = await Modules.data()
        const filterData = data?.filter(student => student?.HackInternalMarks !== undefined)
        const sortData = filterData?.sort((a, b) => b?.HackInternalMarks - a?.HackInternalMarks)
        return sortData
    },

    Activities: async () => {
        const data = await Modules.data()
        const filterData = data?.filter(student => student?.HackActivityMarks !== undefined)
        const sortData = filterData?.sort((a, b) => b?.HackActivityMarks - a?.HackActivityMarks)
        return sortData
    }
}