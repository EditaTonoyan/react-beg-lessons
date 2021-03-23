export default function GetDate(date) {
    return date.toISOString().slice(0,10);
}