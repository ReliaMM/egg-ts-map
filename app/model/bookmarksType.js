
module.exports = app => {
  const { BIGINT, STRING, DATE } = app.Sequelize;
  const BookmarkType = app.model.define('bookmark_type', {
    id: { type: BIGINT, primaryKey: true, autoIncrement: true },
    name: STRING(30),
    subject: STRING(255),
    created_at: DATE,
    updated_at: DATE,
  });
  BookmarkType.associate = function (){
    app.model.BookmarksType.hasMany(app.model.BookmarksTag, {
      foreignKey: 'type',
      targetKey: 'id'
    })
  }
  return BookmarkType;
};