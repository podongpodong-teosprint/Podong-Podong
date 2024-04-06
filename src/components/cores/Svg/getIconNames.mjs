/**
 * You can run this getIconNames.mjs by run 'yarn icon' in the terminal.
 * The script 'yarn icon' is defined at the package.json - scripts property.
 * If you have any questions, contact cherryme@deltax.ai
 */

import fs from 'node:fs';
import path from 'node:path';

const svgIconPath = path.join(import.meta.filename, '../../../../assets/svgs');
const svgTypesPath = path.join(import.meta.filename, '../../../../components/cores/Svg/types.ts');
const searchString = 'export type TypeIconName =';

fs.readdir(svgIconPath, (err, files) => {
  if (err) {
    throw Error(`🤔 Please check your svgIconPath : ${svgIconPath} \n${err}`);
  }

  let svgIconNames = files
    .filter((file) => file.endsWith('.svg')) // filter except .svg
    .map((file) => file.slice(0, -4)) // remove .svg
    .map((file) => `'${file}'`) // convert to string
    .join('|'); // 'icon_1' | 'icon_2'...

  fs.readFile(svgTypesPath, 'utf8', (err, data) => {
    if (err) {
      throw Error(`🤔 Please check your svgTypesPath : ${svgTypesPath} \n${err}`);
    }

    const index = data.indexOf(searchString);

    if (index === -1) {
      throw Error(`🤔 Please check your serachString('${searchString}') and types.ts \n`);
    }

    const modifiedContent = data.slice(0, index + searchString.length) + svgIconNames + ';';

    fs.writeFile(svgTypesPath, modifiedContent, 'utf8', (err) => {
      if (err) {
        throw Error(`🤔 Something wrong while writing types to your types.ts \n ${err}`);
      }
      console.log('🤞 Successfully added SVG Types.');
    });
  });
});
