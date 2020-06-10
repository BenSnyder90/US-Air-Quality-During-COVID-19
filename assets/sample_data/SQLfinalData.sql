create table airqualityindex(
	date date not null,
	city varchar not null,
	state varchar not null,
	lag numeric not null,
	lng numeric not null,
	population numeric not null,
	aqi numeric not null,
	catagory varchar not null,
	defining_paramerter varchar not null,
	initial_business_closing date not null
);

select * from airqualityindex;
