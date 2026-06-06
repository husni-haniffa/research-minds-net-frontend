import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

export function formatSriLankaDate(date: string | Date) {
    return dayjs(date)
        .tz("Asia/Colombo")
        .format("DD MMM YYYY, hh:mm A");
}

export const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("en-US", {
        weekday: "short",
        year: "numeric",
        month: "short",
        day: "numeric",
    })
}

export const formatTime = (time: string) => {
    const [hour, minute] = time.split(":").map(Number)
    const period = hour >= 12 ? "PM" : "AM"
    const hour12 = hour % 12 === 0 ? 12 : hour % 12
    return `${hour12}:${minute.toString().padStart(2, "0")} ${period}`
}