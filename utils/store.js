import {
    BehaviorSubject,
    shareReplay,
  } from "rxjs";
  
  import {filter } from "rxjs/operators";

  export const mealTypeSubject$ = new BehaviorSubject([]);
  export const dietSubject$ = new BehaviorSubject([]);
  export const mealType$ = mealTypeSubject$.pipe(shareReplay(1));
  export const diet$ = dietSubject$.pipe(shareReplay(1));
  export const searchResultSubject$ = new BehaviorSubject(null);
  export const searchResult$ = searchResultSubject$.pipe(
    filter((item) => item !== null),
    shareReplay(1)
  );
  export const currentSearch$ = new BehaviorSubject('')
  export const recepie$ = new BehaviorSubject(null);




