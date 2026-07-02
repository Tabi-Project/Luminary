export interface NominationFilters {
  search?: string;
  country?: string;
}

export interface AdminNominationFilters extends NominationFilters {
  page?: number;
  limit?: number;
  sort_by?: "created_at" | "nominee_name";
  sort_order?: "asc" | "desc";
}
