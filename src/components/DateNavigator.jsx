import { dateTextFromDate, dayFromDate, dayNumberFromDate, weekDays, weekNumberFromDate } from "../utils/utils";
import { NavItem } from "./NavItem";

export function DateNavigator({ selectedDate, setSelectedDate }){
    return (
        <nav className="flex flex-col gap-4 my-8">
            <div className="flex flex-wrap justify-center gap-4">
                {weekDays.map((day, index) => {
                    const dateValue = new Date(selectedDate);
                    dateValue.setDate(selectedDate.getDate() - dayNumberFromDate(selectedDate) + index);
                    return (
                        <NavItem title={day} key={index} isSelected={dayFromDate(selectedDate) === day}
                        onClick={() => setSelectedDate(dateValue)} />
                    )
                })}
            </div>
            <div className='flex flex-col items-center'>
                <p className='text-lg font-bold select-none'>
                    <span className='cursor-pointer' onClick={() => {
                        const newDate = new Date(selectedDate);
                        newDate.setDate(newDate.getDate() - 7);
                        setSelectedDate(newDate);
                    }}>&lt;&lt; </span>
                    Week {weekNumberFromDate(selectedDate)}
                    <span className='cursor-pointer' onClick={() => {
                        const newDate = new Date(selectedDate);
                        newDate.setDate(newDate.getDate() + 7);
                        setSelectedDate(newDate);
                    }}> &gt;&gt;</span>
                </p>
                <p>{dateTextFromDate(selectedDate)}</p>
            </div>
        </nav>
    )
}