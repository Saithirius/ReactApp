export const dateFormat = (date: Date): string => {
    let dd = date.getDate() as string | number
    if (dd < 10) dd = '0' + dd;
    let mm = date.getMonth() + 1 as string | number
    if (mm < 10) mm = '0' + mm;
    let yy = date.getFullYear() as string | number
    if (yy < 10) yy = '0' + yy;
    return dd + '.' + mm + '.' + yy
}