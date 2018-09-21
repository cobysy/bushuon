// yarn parse:kanjidic2

import fs, { read } from 'fs';
import xml2js from 'xml2js';
import { readjyouyou } from './parse_jyouyou';

// tslint:disable-next-line:no-empty
let logwarn = (s: string) => { };
// tslint:disable-next-line:no-empty
let logerror = (s: string) => { };

export async function readkanjidic2(options: { [key: string]: any } = {}): Promise<any> {
    return new Promise<any>((resolve, reject) => {
        _readkanjidic2(options, (err: any, result: any) => {
            if (err) { reject(err); }
            resolve(result);
        });
    });
}

function _readkanjidic2(options: { [key: string]: any }, callback: (err: any, result: any) => void) {
    const opts = Object.assign({}, options);
    opts.path = opts.path || './data/kanjidic2.xml';
    opts.jyouyouonly = opts.jyouyouonly || false;
    const jyouyou = opts.jyouyouonly ? readjyouyou() : [];

    const parser = new xml2js.Parser({ explicitArray: false, mergeAttrs: true });

    const xml = ((): string => {
        let r = fs.readFileSync(opts.path, 'utf8');
        r = r.substring(r.indexOf('<kanjidic2>'));
        return r;
    })();

    parser.parseString(xml, (err: any, result: any) => {
        if (err) {
            throw err;
        }
        const ret: any[] = [];
        result.kanjidic2.character.forEach((element: any, index: any, array: any) => {
            if (opts.jyouyouonly && !jyouyou.includes(element.literal)) {
                logwarn('Ignoring ' + element.literal);
                return;
            }

            const warns: string[] = [];
            try {
                ['jis208', 'jis212', 'jis213'].forEach((cptype) => {
                    const jiscp = element.codepoint.cp_value.find((cpv: any) => cpv.cp_type === cptype);
                    if (jiscp) { element[cptype] = jiscp._; }
                });
                delete element.codepoint;
                delete element.dic_number;
                delete element.radical;
                Object.assign(element, element.misc);
                delete element.misc;
                if (element.query_code) {
                    const qcode = element.query_code.q_code;
                    if (Array.isArray(qcode)) {
                        element.skip_code = qcode
                            .filter((qc: any) => qc.qc_type === 'skip')[0]._; // .split('-');
                    } else if (qcode && qcode.qc_type === 'skip') {
                        element.skip_code = qcode._;
                    }
                }
                if (!element.skip_code) {
                    warns.push('skip_code');
                }
                delete element.query_code;
                const rm = element.reading_meaning;
                if (rm) {
                    const reading = rm.rmgroup.reading;
                    if (Array.isArray(reading)) {
                        ['ja_on', 'ja_kun'].forEach((rtype) => {
                            element[rtype] = reading
                                .filter((r: any) => r.r_type === rtype)
                                .map((r: any) => r._);
                        });
                    } else if (reading) {
                        element[reading.r_type] = reading._;
                    }
                    const meaning = rm.rmgroup.meaning;
                    if (Array.isArray(meaning)) {
                        element.meaning = meaning
                            .filter((m: any) => typeof m === 'string');
                    } else if (meaning) {
                        element.meaning = [meaning];
                    }
                }
                if (!element.ja_on) {
                    warns.push('ja_on');
                }
                if (!element.ja_on) {
                    warns.push('ja_kun');
                }
                if (!element.meaning) {
                    warns.push('meaning');
                }
                delete element.reading_meaning;

                if (warns.length) {
                    logwarn('Missing ' + warns.join() + ' on ' + element.literal);
                }

                ret.push(element);
            } catch (err) {
                if (warns.length) {
                    logwarn('Missing ' + warns.join() + ' on ' + element.literal);
                }
                logerror('Error processing character:');
                logerror(JSON.stringify(element));
                callback(err, null);
            }
        });

        callback(null, ret);
    });
}

const isMain = (typeof require !== 'undefined' && require.main === module);
if (isMain) {
    logwarn = (s: string) => console.log(s);
    logerror = (s: string) => console.log(s);
    readkanjidic2({ jyouyouonly: true })
        .then((characters) => {
            console.log(JSON.stringify(characters.slice(0, 10)));
            // console.log(JSON.stringify(characters));
            console.log('Number of read characters: ' + characters.length);
            console.log('Number of jyouyou characters: ' + readjyouyou().length);
        });
}
