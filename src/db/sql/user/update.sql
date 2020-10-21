UPDATE
    ${schema~}.user
SET
    username = ${username},
    first_name = ${firstName},
    last_name = ${lastName},
    second_surname = ${secondSurName},
    email = ${email},

    status = ${status},
    role_id = ${roleId},
    updated_at = now()
WHERE 
    id = ${id} 
RETURNING 
    id,
    username AS username,
    first_name AS firstName,
    last_name AS lastName,
    second_surname AS secondSurName,
    email AS email,
    --profile_image AS profileImage,
    status
    