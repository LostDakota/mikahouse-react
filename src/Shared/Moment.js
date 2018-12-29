const day = 86400000;
const hour = day / 24;
const minute = hour / 60;

export const Ago = then => {
    let now = parseInt(new Date().getTime().toString().split(0, 8)[0]);

    let duration = now - then;
    let moment = '';

    let days = Math.ceil(duration / day);
    let hours = duration % days / hour;
    let minutes = hours % minute / minute;

    console.log(duration);
    console.log('days ' + days);
    console.log(hours);
    console.log(minutes);

    return duration;
}

export const Normal = timestamp => {
    var date = new Date(timestamp);
    return `${date.toDateString()} ${date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}`
}