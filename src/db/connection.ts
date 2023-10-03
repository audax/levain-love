import { sql } from '@vercel/postgres';

export async function migrate() {
    try {
        await sql`
        create table if not exists recipes
        (
            id   uuid default gen_random_uuid()
                constraint recipes_pk
                    primary key,
            data jsonb not null
        );
        `
        console.log('migrated')
    } catch (e) {
        console.log(e)
        return
    }
}

export { sql }
