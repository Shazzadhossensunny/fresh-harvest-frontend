import { baseApi } from "@/redux/api/baseApi";

interface Category {
  id: string;
  categoryName: string;
  createdAt: string;
  updatedAt: string;
}

interface CategoryResponse {
  success: boolean;
  message: string;
  data: Category[];
}

interface SingleCategoryResponse {
  success: boolean;
  message: string;
  data: Category;
}

interface CreateCategoryRequest {
  name: string;
  description?: string;
}

interface UpdateCategoryRequest {
  name?: string;
  description?: string;
}

export const categoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllCategories: builder.query<CategoryResponse, void>({
      query: () => ({
        url: "/category",
        method: "GET",
      }),
      providesTags: ["Category"],
    }),
    // Get category by ID
    getCategoryById: builder.query<SingleCategoryResponse, string>({
      query: (id) => ({
        url: `/category/${id}`,
        method: "GET",
      }),
      providesTags: (result, error, id) => [{ type: "Category", id }],
    }),

    // Create new category
    createCategory: builder.mutation<
      SingleCategoryResponse,
      CreateCategoryRequest
    >({
      query: (categoryData) => ({
        url: "/category",
        method: "POST",
        body: categoryData,
      }),
      invalidatesTags: ["Category"],
    }),

    // Update category by ID
    updateCategory: builder.mutation<
      SingleCategoryResponse,
      { id: string; data: UpdateCategoryRequest }
    >({
      query: ({ id, data }) => ({
        url: `/category/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Category", id },
        "Category",
      ],
    }),

    // Delete category by ID
    deleteCategory: builder.mutation<SingleCategoryResponse, string>({
      query: (id) => ({
        url: `/category/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Category"],
    }),
  }),
});

export const {
  useGetAllCategoriesQuery,
  useGetCategoryByIdQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = categoryApi;
