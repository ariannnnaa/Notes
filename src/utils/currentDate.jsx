export const currentDate = () => {
    const months = [
        'января',
        'февраля',
        'марта',
        'апреля',
        'мая',
        'июня',
        'июля',
        'августа',
        'сентября',
        'октября',
        'ноября',
        'декабря',
    ];
    const rn = new Date();

    const date = rn.getDate();
    const month = months[rn.getMonth()];
    const year = rn.getFullYear();
    const today = `${date} ${month} ${year}`;
    
    return today;
}
