SELECT
    id,
    subject_id AS "subjectId",
    description,
    grade_id AS "gradeId",
    name
FROM ${ schema~ }.learning_objective
WHERE subject_id = ${subjectId} AND grade_id = ${gradeId}
ORDER BY id

