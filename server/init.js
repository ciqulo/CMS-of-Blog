`
create table vwp.vwp_posts
(
	ID bigint auto_increment
		primary key,
	post_author varchar(60) null,
	post_content longtext null,
	post_title text null,
	post_date datetime null,
	post_modified datetime null,
	post_type varchar(20) null,
	post_category varchar(60) null,
	post_tag varchar(60) null
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

`




`
INSERT INTO vwp.vwp_posts (post_author, post_content, post_title, post_date, post_modified, post_type, post_category, post_tag) VALUES ('yc', 'This is the sample content', 'the sample title', '2017-08-07 16:24:58', null, 'reckless', 'default category', 'default tag');
`


`
INSERT INTO vwp.vwp_users (user_name, user_pass, user_email, user_url, user_salt) VALUES ('ef', 'vr', 'erf', 'we', null);
INSERT INTO vwp.vwp_users (user_name, user_pass, user_email, user_url, user_salt) VALUES ('ciqu', '2211', 'a@b.com', 'y.com', null);
INSERT INTO vwp.vwp_users (user_name, user_pass, user_email, user_url, user_salt) VALUES ('yc', '42fc7ff2996f7f313b364c69233eb2e54f06a921a258fb5ac83122fc33c52031', null, null, 'kOk4oS93EW1oz9Sgcp3EYCf4S4jzpv');
`
