"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.readExcel = void 0;
const tslib_1 = require("tslib");
// import xlsx from 'xlsx';
const path_1 = tslib_1.__importDefault(require("path"));
const winston_logger_1 = require("./logger/winston_logger");
// import {logger} from './logger/winston_logger';
// const ExcelJS = require('exceljs');
// import fs from 'fs';
// export function readExcel(fileName: string) {
//   const workbook = xlsx.readFile(
//     path.join(__dirname, '..', '..', '/public/', fileName)
//   );
//   const worksheets: xlsx.WorkSheet = workbook.SheetNames;
//   const data = [];
//   worksheets.forEach((sheetName: string) => {
//     data.push(
//       ...xlsx.utils.sheet_to_json(workbook.Sheets[sheetName], {
//         raw: true,
//         header: 1,
//       })
//     );
//   });
//   logger.info(`${fileName} parsed successfully`);
//   return data;
// }
// export async function readExcel(fileName: string) {
//   const data = [];
//   var workbook = new ExcelJS.Workbook();
//   await workbook.xlsx
//     .readFile(path.join(__dirname, '..', '..', '/public/', fileName))
//     .then(function () {
//       var worksheet = workbook.getWorksheet('exp_Dec21');
//       worksheet.eachRow({includeEmpty: true}, function (row, rowNumber) {
//         console.log('Row ' + rowNumber + ' = ' + JSON.stringify(row.values));
//         data.push(row.values);
//       });
//     });
//   logger.info(`${fileName} parsed successfully`);
//   return data;
// }
async function readExcel(fileName) {
    const excel = require('exceljs');
    const workbook = new excel.Workbook();
    // use readFile for testing purpose
    // await workbook.xlsx.load(objDescExcel.buffer);
    await workbook.xlsx.readFile(path_1.default.join(__dirname, '..', '..', '/public/', fileName));
    const data = [];
    workbook.worksheets.forEach((sheet) => {
        {
            // read first row as data keys
            const firstRow = sheet.getRow(1);
            if (!firstRow.cellCount)
                return;
            const keys = firstRow.values;
            sheet.eachRow((row, rowNumber) => {
                if (rowNumber === 1)
                    return;
                const values = row.values;
                const obj = {};
                for (let i = 1; i < keys.length; i++) {
                    obj[keys[i]] = values[i];
                }
                // console.log(rowNumber, obj);
                data.push(obj);
            });
        }
    });
    winston_logger_1.logger.info(`FOUND ${data.length} ROWS IN ${fileName}`);
    return data;
}
exports.readExcel = readExcel;
//# sourceMappingURL=parser.js.map