
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('students').del()
    .then(function () {
      // Inserts seed entries
      return knex('students').insert([
        {name: 'John', cohort_id: 1},
        {name: 'Bill', cohort_id: 1},
        {name: 'Amanda', cohort_id: 2}
      ]);
    });
};
