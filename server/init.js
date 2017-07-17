const mysql = require('mysql')

const cnt = mysql.createConnection({
  host: 'localhost',
  user: 'ciqu',
  password: '2211',
  database: 'vwp'
})

cnt.connect()

cnt.query('SELECT * FROM vwp.vwp_users', function (error, result) {
  // console.log(result)
  if (!error) process.exit(0)
})


const sql = `
create table vwp.vwp_posts
(
	ID bigint auto_increment
		primary key,
	post_author bigint null,
	post_content longtext null,
	post_title text null,
	post_date datetime null,
	post_modified datetime null,
	post_type varchar(20) null
)
;

create index posts_author__index
	on vwp_posts (post_author)
;

create table vwp.vwp_users
(
	ID bigint auto_increment
		primary key,
	user_name varchar(60) null,
	user_pass varchar(100) null,
	user_email varchar(100) null,
	user_url varchar(100) null,
	user_salt varchar(100) null
)
;

alter table vwp_posts
	add constraint post_author_user_ID_fk
		foreign key (post_author) references vwp.vwp_users (ID)
;

INSERT INTO vwp.vwp_users (user_name, user_pass, user_email, user_url, user_salt) VALUES ('yc', '42fc7ff2996f7f313b364c69233eb2e54f06a921a258fb5ac83122fc33c52031', null, null, 'kOk4oS93EW1oz9Sgcp3EYCf4S4jzpv');

`

cnt.query(sql, function (error, results, fields) {
  if (error) return console.log(error)
  console.log('success')
})

// cnt.end()
