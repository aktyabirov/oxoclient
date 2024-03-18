import { useQuery } from "@tanstack/react-query";
import { request } from "../config/request";

export const useFetchDetail = (id) => {
    return useQuery({
      queryKey:  ["productDetail", id],
      queryFn: () => request.get(`/all/${id}`).then(res => res.data),
    });
  };