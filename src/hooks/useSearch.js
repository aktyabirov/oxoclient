import { useQuery } from "@tanstack/react-query";
import { request } from "../config/request";

export const useSearch = (search = "") => {
    return useQuery({
        queryKey: ["productsearch", search],
        queryFn: ()=> {
            return request.get("/all", {params: {title_like: search}}).then((res)=>res.data);
        }     
    })
}