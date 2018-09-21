// yarn parse:jyouyou

import fs from 'fs';

export function readjyouyou(path: string = './data/jyouyou.txt') {
    return fs.readFileSync('./data/jyouyou.txt', 'utf8')
        .split(/\r?\n/)
        .filter((s) => s && !s.startsWith('#'))
        .map((s) => s.split(/\s/))
        .reduce((x, y) => x.concat(y), []) // selectMany
        .filter((s) => s);
}

const isMain = (typeof require !== 'undefined' && require.main === module);
if (isMain) {
    // tslint:disable-next-line:no-console
    console.log(readjyouyou());
}