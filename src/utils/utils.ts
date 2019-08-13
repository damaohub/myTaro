export function mathAccount(m:number, n:number) {
    if (m < 0 || n < 0 || m < n) {
        return 0;
    }
    n = n < (m - n) ? n : m - n;
    if (n == 0) {
        return 1;
    }
    var result = m;
    for (var i = 2, j = result - 1; i <= n; i++, j--) {
        result = result * j / i;
    }
    return result;
}
