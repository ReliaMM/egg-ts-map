// This file is created by egg-ts-helper@1.25.6
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportBookmarksTag = require('../../../app/model/bookmarksTag');
import ExportBookmarksType = require('../../../app/model/bookmarksType');
import ExportShare = require('../../../app/model/share');

declare module 'egg' {
  interface IModel {
    BookmarksTag: ReturnType<typeof ExportBookmarksTag>;
    BookmarksType: ReturnType<typeof ExportBookmarksType>;
    Share: ReturnType<typeof ExportShare>;
  }
}
