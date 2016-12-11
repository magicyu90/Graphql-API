// @flow

import DataLoader from 'dataloader';

// export default new DataLoader( queries => new Promise( resolve => {
//   const waitingOn = queries.length;
//   const results = [];
//   db.parallelize(() => {
//     queries.forEach((query, index) => {
//       db.all.apply(db, query.concat((error, result) => {
//         results[index] = error || result;
//         if (--waitingOn === 0) {
//           resolve(results);
//         }
//       }));
//     });
//   });
// }), { cache: false });

export default new DataLoader(
    queries => {
        return Promise.all( queries );
        // .map( ({
        //   query, sort, limit, count, fields, operation='find'
        // }) => {
        //   if (!fields && ['find','findOne'].indexOf(operation) >= 0) {
        //     fields = {salt: 0, hash: 0};
        //   };
        //
        //   const result = ProgramDB[operation](query, fields);
        //   if (sort) {
        //     result.sort(sort);
        //   };
        //   if (limit) {
        //     result.limit(limit);
        //   };
        //   if (count) {
        //     result.count();
        //   };
        //   return result;
        // }));
    },
    { cache: false }
);
