export const weekDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

export function dayFromDate(date){
    return weekDays[dayNumberFromDate(date)]
}

export function weekNumberFromDate(curDate){
    let date = new Date(curDate);
    date.setHours(0, 0, 0, 0);
    date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7);
    const week1 = new Date(date.getFullYear(), 0, 4);
    return 1 + Math.round(((date.getTime() - week1.getTime()) / 86400000
                    - 3 + (week1.getDay() + 6) % 7) / 7);
}

export function dayNumberFromDate(date){
    return (date.getDay() + 6) % 7;
}

export function dateValueFromDate(date){
    return [date.getFullYear(),
        (date.getMonth() + 1).toString().padStart(2, "0"),
        date.getDate().toString().padStart(2, "0")].join("-");
}

export function dateTextFromDate(date){
    return [date.getFullYear(),
        (date.getMonth() + 1).toString().padStart(2, "0"),
        date.getDate().toString().padStart(2, "0")].join(". ") + ".";
}

export function timeTextFromDate(date){
    return [date.getHours().toString().padStart(2, "0"),
        date.getMinutes().toString().padStart(2, "0")].join(":");
}