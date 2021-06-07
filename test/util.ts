import {basename, dirname, join} from 'path';
import {readFileSync} from 'fs';

export const loadMatchingTemplate = (filename: string): string => {
    const testFilename = basename(filename);
    const testDirname = dirname(filename);

    const vtlFileName = testFilename.substring(0, testFilename.length - 8) + '.vtl';
    const templateFilePath = join(testDirname, '../resolvers', vtlFileName);

    return readFileSync(templateFilePath).toString();
};
