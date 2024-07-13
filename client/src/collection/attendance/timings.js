export const Timings = () => {
    const date = new Date();
    const day = date.getDay();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    
    let isTechTime = false;
    const isYogaTime = (hours >= 5 && hours < 9);

    // Tech timings on Saturday (1pm to 5pm) and other days (5pm to 8:50pm)
    if (day === 6) {
        isTechTime = (hours >= 13 && hours < 17) || (hours === 17 && minutes <= 50);
    } else {
        isTechTime = (hours >= 17 && hours < 20) || (hours === 20 && minutes <= 50);
    }

    return new Promise((resolve, reject) => {
        resolve({
            tech: isTechTime,
            yoga: isYogaTime,
            loc: true // Setting loc to true since location check is removed
        });
    });
};
