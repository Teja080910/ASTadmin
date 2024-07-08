import { Actions } from "../../actions/actions"

export const Modules = {
    data: async () => {
        return await Actions.Students()
            .then((res) => { return (res?.data) })
            .catch((e) => console.log(e))
    },

    Attendance: async () => {
        const data = await Modules.data()
        const filterData = data?.filter(student => student?.AttendDays !== undefined)
        const sortData = filterData?.sort((a, b) => b?.AttendDays - a?.AttendDays)
        return sortData
    },

    Score: async () => {
        const data = await Modules.data();
        const filterData = data?.filter(student => student?.Tasks);
        const marks = filterData?.map(student => {
            let totalMarks = 0;
            Object.values(student?.Tasks)?.forEach(tasks => {
                Object.values(tasks)?.forEach(task => {
                    totalMarks += parseInt(task?.GetMarks || 0);
                });
            });
            return { Name: student?.Name, Marks: totalMarks };
        });
        return marks.sort((a, b) => b.Marks - a.Marks);
    },

    Overall: async () => {
        const data = await Modules.data();
        const marks = data?.map(student => {
            let totalMarks = 0;
            let total = 0;
            student?.Tasks && Object.values(student?.Tasks)?.forEach(tasks => {
                Object.values(tasks)?.forEach(task => {
                    totalMarks += parseInt(task?.GetMarks || 0);
                });
            });
            total = parseInt(totalMarks) + parseInt(student?.AttendDays || 0) + parseInt(student?.ActivityMarks || 0) + parseInt(student?.InternalMarks || 0)
            return { Name: student?.Name, Total: total };
        });
        return marks.sort((a, b) => b.Total - a.Total);
    },

    Internals: async () => {

    },

    Activities: async () => {

    }
}