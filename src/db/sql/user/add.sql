INSERT INTO
    ${ schema~ }.user (
        username,
        password,
        salt,
        first_name,
        last_name,
        second_surname,
        email,
        profile_image,
        role_id
    )
VALUES
    (
        ${username},
        ${password},
        ${salt},
        ${firstName},
        ${lastName},
        ${secondSurName},
        ${email},
        ${profileImage},
        ${roleId}
    ) RETURNING *