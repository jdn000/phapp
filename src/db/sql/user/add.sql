INSERT INTO
    ${ schema~ }.user (
        username,
        password,
        salt,
        first_name,
        last_name,
        second_surname,
        email,

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

        ${roleId}
    ) RETURNING *