/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable("rooms", tbl => {
        tbl.increments() //id field
        tbl.string("room")
        tbl.string("userName").notNullable()

    })
        .createTable("messages", tbl => {
            tbl.increments() //id field
            tbl.string("userName").notNullable()
            tbl.string("message").notNullable()
            tbl.timestamps(true, true)

            tbl.integer("rooms_messages")
                .unsigned()
                .references("id")
                .inTable("rooms")
                .onDelete("CASCADE")
                .onUpdate("CASCADE")
        })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTableIfExists("rooms").dropTableIfExists("messages")
};
