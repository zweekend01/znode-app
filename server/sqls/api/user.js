exports.CREATE_TABLE = `
  CREATE TABLE IF NOT EXISTS users (
    id          BIGINT          NOT NULL  AUTO_INCREMENT,
    name        VARCHAR(16)     NOT NULL,
    password    VARCHAR(100)    NOT NULL,
    tel         CHAR(11)        NOT NULL,
    address     VARCHAR(256)    ,
    email       VARCHAR(64)     ,
    PRIMARY KEY (id),
    UNIQUE INDEX uni_name (name),
    UNIQUE INDEX uni_tel (tel)
  );
`

// 插入一条用户数据
exports.INSERT = `
  INSERT INTO users (name, password, tel, address, email) VALUES (?, ?, ?, ?, ?);
`

// 依据名字查询
exports.SELECT_BY_NAME = `
  SELECT * FROM users WHERE name = ?;
`
