export function centsToDollars(priceCents) {
    const priceDollars = (priceCents / 100).toFixed(2);
    return priceDollars;
}