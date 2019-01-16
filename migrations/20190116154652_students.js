
exports.up = function(knex, Promise) {
    return knex.schema.createTable('students', function(tbl) {
        tbl.increments();
        tbl.string('name', 128).notNullable();
        tbl.integer('cohort_id').unsigned().references('id').inTable('cohorts').notNullable();
        tbl.unique('name', 'uq_student_name');
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('students');
};
