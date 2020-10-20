SELECT
    u.id,
    u.username AS username,
    u.first_name AS firstName,
    u.last_name AS lastName,
    u.second_surname AS secondSurName,
    u.password AS password,
    u.salt AS salt, 
    u.email AS email,
    u.profile_image AS profileImage,
    u.status AS status  
FROM
    ${schema~}.user u
WHERE
    username = ${username}