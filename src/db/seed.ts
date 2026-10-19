import { db } from './index';
import * as schema from './schema';
import { reset, seed } from 'drizzle-seed';

 
async function main() {
  //console.log(db);
  await reset(db as any, schema)
  await seed(db as any, schema).refine((funcs) => ({
    user: {
      columns: {
        id: funcs.uuid(),
        name: funcs.firstName(),
        email: funcs.email(),
        role: funcs.valuesFromArray({
          values: ['user'],
        }),
      },
      count: 6,
    },
    session: {
      count: 0,
    },
    account: {
      count: 0,
    },
    verification: {
      count: 0,
    },
    testimonials: {
      columns: {
        body: funcs.loremIpsum({ sentencesCount: 3 }),
      },
      count: 9,
    },
    clientType: {
      columns: {
        name: funcs.valuesFromArray({
          values: ['individual', 'business'],
          isUnique: true,
        }),
      },
      count: 2,
    },
  }))
}

main().catch((err) => {
  console.error('Ошибка при генерации данных:', err)
  process.exit(1)
})