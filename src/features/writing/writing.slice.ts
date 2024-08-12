import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';


export interface Post {
    id: number,
    title: string,
    excerpt: string,
    categories: string[],
    created: string,
    modified: string 
}

export interface Posts {
    next_page_url: string;
    prev_page_url: string;
    modified: string;
    data: Post[];
    maxPage: number;
    allCategories: string[];
    currentPage: number;
    status: {is_success:boolean, message: string};
}

export const postApiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://junho-dev-world.local/',
        prepareHeaders(headers) {
            headers.append('Access-Control-Allow-Origin','*');
            return headers;
        }  
    }),

    endpoints(builder) {
        return {
            fetchPosts: builder.query<Posts, {limit:number, page:number, category:string|undefined}>({
                query(data) {
                    if(data.category) {
                        return `/wp-json/writing/v1/posts?limit=${data.limit}&page=${data.page}&category=${data.category}`;
                    }

                    return `/wp-json/writing/v1/posts?limit=${data.limit}&page=${data.page}`;
                },
            }),

            fetchNextPosts:  builder.query<Posts, string> ({
                query(url) {
                    return url;
                }
            })
        }
    }
});

export const {useFetchPostsQuery, useLazyFetchPostsQuery, useLazyFetchNextPostsQuery} = postApiSlice