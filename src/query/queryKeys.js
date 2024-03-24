import {
  createQueryKeys,
  mergeQueryKeys,
} from "@lukemorales/query-key-factory";

export const todoQueryKeys = createQueryKeys("todo", {
  list: () => [],
  detail: (id) => [{ id }],
});

export const userQueryKeys = createQueryKeys("user", {
  detail: (id) => [{ id }],
});

export const queryKeys = mergeQueryKeys(todoQueryKeys, userQueryKeys);
