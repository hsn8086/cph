import path from 'path';
import fs from 'fs';
import { Problem } from './types';
import { getSaveLocationPref } from './preferences';
import crypto from 'crypto';

/**
 *  Get the location (file path) to save the generated problem file in. If save
 *  location is available in preferences, returns that, otherwise returns the
 *  director of active file. The extension is `.prob`.
 *
 *  @param srcPath location of the source code
 */
export const getProbSaveLocation = (srcPath: string): string => {
    const savePreference = getSaveLocationPref();
    const srcFileName = path.basename(srcPath);
    const srcFolder = path.dirname(srcPath);
    // const hash = crypto
    //     .createHash('md5')
    //     .update(srcPath)
    //     .digest('hex')
    //     .substr(0);
    const baseProbName = `.${srcFileName}.prob`;
    const cphFolder = path.join(srcFolder, '.cph');
    if (savePreference && savePreference !== '') {
        return path.join(savePreference, baseProbName);
    }
    return path.join(cphFolder, baseProbName);
};
export const getProbSaveLocationOld = (srcPath: string): string => {
    const savePreference = getSaveLocationPref();
    const srcFileName = path.basename(srcPath);
    const srcFolder = path.dirname(srcPath);
    const hash = crypto
        .createHash('md5')
        .update(srcPath)
        .digest('hex')
        .substr(0);
    globalThis.logger.log(`Hash for ${srcFileName} is ${hash}`);
    const baseProbName = `.${srcFileName}_${hash}.prob`;
    const cphFolder = path.join(srcFolder, '.cph');
    if (savePreference && savePreference !== '') {
        return path.join(savePreference, baseProbName);
    }
    return path.join(cphFolder, baseProbName);
};

/** Get the problem for a source, `null` if does not exist on the filesystem. */
export const getProblem = (srcPath: string): Problem | null => {
    let probPath = getProbSaveLocation(srcPath);
    if (!fs.existsSync(probPath)) {
        probPath = getProbSaveLocationOld(srcPath);
        if (!fs.existsSync(probPath)) {
            return null;
        }
    }
    let problem: string;
    try {
        problem = fs.readFileSync(probPath).toString();
        let problemJson = JSON.parse(problem);
        console.log('Problem JSON:', problemJson);
        if (!path.isAbsolute(problemJson.srcPath)) {
            // If srcPath is not absolute, convert it to absolute path
            problemJson.srcPath = path.join(
                path.dirname(srcPath),
                problemJson.srcPath,
            );
        }
        return problemJson;
    } catch (err) {
        return null;
    }
};

/** Save the problem (metadata) */
export const saveProblem = (srcPath: string, problem: Problem) => {
    const srcFolder = path.dirname(srcPath);
    const cphFolder = path.join(srcFolder, '.cph');

    if (getSaveLocationPref() === '' && !fs.existsSync(cphFolder)) {
        globalThis.logger.log('Making .cph folder');
        fs.mkdirSync(cphFolder);
    }
    if (path.isAbsolute(problem.srcPath)) {
        // use file name only
        problem.srcPath = path.basename(problem.srcPath);
    }

    const probPath = getProbSaveLocation(srcPath);
    try {
        fs.writeFileSync(probPath, JSON.stringify(problem));
    } catch (err) {
        throw new Error(err as string);
    }
};
