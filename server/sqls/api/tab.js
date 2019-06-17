exports.CREATE_TABLE = `
  CREATE TABLE IF NOT EXISTS tabs (
    id       BIGINT         NOT NULL AUTO_INCREMENT,
    ename    VARCHAR(16)    NOT NULL,
    cname    VARCHAR(16)    NOT NULL,
    PRIMARY KEY (id),
    UNIQUE INDEX uni_ename (ename),
    UNIQUE INDEX uni_cname (cname)
  );
`

exports.INSERT = `
  INSERT INTO tabs (ename, cname) VALUES (?, ?);
`

exports.SELECT = `
  SELECT * FROM tabs;
`
