// This file is created by egg-ts-helper@1.25.6
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportEmail from '../../../app/service/email';
import ExportExcel from '../../../app/service/excel';
import ExportFile from '../../../app/service/file';
import ExportFileAsync from '../../../app/service/fileAsync';
import ExportLogin from '../../../app/service/login';

declare module 'egg' {
  interface IService {
    email: ExportEmail;
    excel: ExportExcel;
    file: ExportFile;
    fileAsync: ExportFileAsync;
    login: ExportLogin;
  }
}
