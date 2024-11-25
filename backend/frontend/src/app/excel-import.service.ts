import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';

@Injectable({
  providedIn: 'root',
})
export class ExcelImportService {
  constructor() {}

  // Function to read Excel file
  readExcelFile(file: File): Promise<any[]> {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();

      fileReader.onload = (e: any) => {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
        const jsonData = XLSX.utils.sheet_to_json(firstSheet, { header: 1 });
        resolve(jsonData);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };

      fileReader.readAsArrayBuffer(file);
    });
  }
}
