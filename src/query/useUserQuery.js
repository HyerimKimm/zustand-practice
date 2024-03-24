import { useQuery } from "@tanstack/react-query";
import { UserApi } from "../api/UserApi";
import { queryKeys } from "./queryKeys";

export const useUserItemQuery = (id) => {
  return useQuery({
    queryKey: queryKeys.user.detail(id).queryKey,
    queryFn: async () => {
      const res = await UserApi.getUserInfo(id);
      return res;
    },
  });
};
