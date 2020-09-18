export const rand = (maxLimit = 1000000) => {
    let rand = Math.random() * maxLimit;
    return Math.floor(rand);
}
