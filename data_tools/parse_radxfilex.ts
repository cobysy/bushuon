import fs from 'fs';

const isMain = (typeof require !== 'undefined' && require.main === module);
if (!isMain) {
    process.exit();
}

