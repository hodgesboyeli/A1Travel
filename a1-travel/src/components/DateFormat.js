export default function DateFormat(time){
    const formatTimestamp = (timestamp) => {
        const messageDate = new Date(timestamp.seconds * 1000);
        const now = new Date();

        // Check if the date is today
        if (messageDate.toDateString() === now.toDateString()) {
            return messageDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        }

        // Check if the date is within this week
        if (isSameWeek(messageDate, now)) {
            return messageDate.toLocaleDateString([], { weekday: 'long' });
        }

        // Default format for dates older than a week
        return messageDate.toLocaleDateString([], { weekday: 'short', month: '2-digit', day: '2-digit' });
    }

    const isSameWeek = (date1, date2) => {
        const startOfWeek = (date) => {
            const diff = date.getDate() - date.getDay() + (date.getDay() === 0 ? -6 : 1); // adjust when week starts
            return new Date(date.setDate(diff));
        }

        const startOfDate1 = startOfWeek(new Date(date1));
        const startOfDate2 = startOfWeek(new Date(date2));

        return startOfDate1.toDateString() === startOfDate2.toDateString();
    }

    return formatTimestamp(time);
}