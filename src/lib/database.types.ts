
export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export type Database = {
  
  "graphql_public": {
          Tables: {
            [_ in never]: never
          }
          Views: {
            [_ in never]: never
          }
          Functions: {
            "graphql":
{ Args: { "extensions"?: Json,"operationName"?: string,"query"?: string,"variables"?: Json }; Returns: Json
                           }
          }
          Enums: {
            [_ in never]: never
          }
          CompositeTypes: {
            [_ in never]: never
          }
        },"public": {
          Tables: {
            "applications": {
                  Row: {
                    "created_at": string,"department_id": string | null,"end_date": string | null,"id": string,"motivation": string | null,"placement_type": Database["public"]['Enums']["placement_type"],"review_notes": string | null,"reviewed_at": string | null,"reviewed_by": string | null,"start_date": string | null,"status": Database["public"]['Enums']["application_status"],"submitted_at": string | null,"updated_at": string,"user_id": string
                  }
                  ComputedFields: never
                  Insert: {
                    "created_at"?: string,"department_id"?: string | null,"end_date"?: string | null,"id"?: string,"motivation"?: string | null,"placement_type"?: Database["public"]['Enums']["placement_type"],"review_notes"?: string | null,"reviewed_at"?: string | null,"reviewed_by"?: string | null,"start_date"?: string | null,"status"?: Database["public"]['Enums']["application_status"],"submitted_at"?: string | null,"updated_at"?: string,"user_id": string
                  }
                  Update: {
                    "created_at"?: string,"department_id"?: string | null,"end_date"?: string | null,"id"?: string,"motivation"?: string | null,"placement_type"?: Database["public"]['Enums']["placement_type"],"review_notes"?: string | null,"reviewed_at"?: string | null,"reviewed_by"?: string | null,"start_date"?: string | null,"status"?: Database["public"]['Enums']["application_status"],"submitted_at"?: string | null,"updated_at"?: string,"user_id"?: string
                  }
                  Relationships: [
                    {
      foreignKeyName: "applications_department_id_fkey"
      columns: ["department_id"]
isOneToOne: false
      referencedRelation: "departments"
      referencedColumns: ["id"]
    }
                  ]
                },"departments": {
                  Row: {
                    "created_at": string,"description": string | null,"id": string,"is_open": boolean,"name": string,"slots": number
                  }
                  ComputedFields: never
                  Insert: {
                    "created_at"?: string,"description"?: string | null,"id"?: string,"is_open"?: boolean,"name": string,"slots"?: number
                  }
                  Update: {
                    "created_at"?: string,"description"?: string | null,"id"?: string,"is_open"?: boolean,"name"?: string,"slots"?: number
                  }
                  Relationships: [
                    
                  ]
                },"documents": {
                  Row: {
                    "application_id": string,"created_at": string,"doc_type": string,"file_name": string | null,"file_path": string,"id": string,"user_id": string
                  }
                  ComputedFields: never
                  Insert: {
                    "application_id": string,"created_at"?: string,"doc_type": string,"file_name"?: string | null,"file_path": string,"id"?: string,"user_id": string
                  }
                  Update: {
                    "application_id"?: string,"created_at"?: string,"doc_type"?: string,"file_name"?: string | null,"file_path"?: string,"id"?: string,"user_id"?: string
                  }
                  Relationships: [
                    {
      foreignKeyName: "documents_application_id_fkey"
      columns: ["application_id"]
isOneToOne: false
      referencedRelation: "applications"
      referencedColumns: ["id"]
    }
                  ]
                },"profiles": {
                  Row: {
                    "course": string | null,"created_at": string,"full_name": string | null,"id": string,"institution": string | null,"national_id": string | null,"phone": string | null,"reg_number": string | null,"updated_at": string,"year_of_study": string | null
                  }
                  ComputedFields: never
                  Insert: {
                    "course"?: string | null,"created_at"?: string,"full_name"?: string | null,"id": string,"institution"?: string | null,"national_id"?: string | null,"phone"?: string | null,"reg_number"?: string | null,"updated_at"?: string,"year_of_study"?: string | null
                  }
                  Update: {
                    "course"?: string | null,"created_at"?: string,"full_name"?: string | null,"id"?: string,"institution"?: string | null,"national_id"?: string | null,"phone"?: string | null,"reg_number"?: string | null,"updated_at"?: string,"year_of_study"?: string | null
                  }
                  Relationships: [
                    
                  ]
                },"user_roles": {
                  Row: {
                    "created_at": string,"id": string,"role": Database["public"]['Enums']["app_role"],"user_id": string
                  }
                  ComputedFields: never
                  Insert: {
                    "created_at"?: string,"id"?: string,"role": Database["public"]['Enums']["app_role"],"user_id": string
                  }
                  Update: {
                    "created_at"?: string,"id"?: string,"role"?: Database["public"]['Enums']["app_role"],"user_id"?: string
                  }
                  Relationships: [
                    
                  ]
                }
          }
          Views: {
            [_ in never]: never
          }
          Functions: {
            "has_role":
{ Args: { "_role": Database["public"]['Enums']["app_role"],"_user_id": string }; Returns: boolean
                           },
"is_staff":
{ Args: { "_user_id": string }; Returns: boolean
                           }
          }
          Enums: {
            "app_role": "student"|"officer"|"admin","application_status": "draft"|"submitted"|"under_review"|"shortlisted"|"approved"|"rejected"|"withdrawn","placement_type": "attachment"|"internship"
          }
          CompositeTypes: {
            [_ in never]: never
          }
        }
}

type DatabaseWithoutInternals = Omit<Database, '__InternalSupabase'>

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never
> = DefaultSchemaTableNameOrOptions extends { schema: keyof DatabaseWithoutInternals }
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
  ? (DefaultSchema["Tables"] & DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
      Row: infer R
    }
    ? R
    : never
  : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = DefaultSchemaTableNameOrOptions extends { schema: keyof DatabaseWithoutInternals }
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
  ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
      Insert: infer I
    }
    ? I
    : never
  : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = DefaultSchemaTableNameOrOptions extends { schema: keyof DatabaseWithoutInternals }
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
  ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
      Update: infer U
    }
    ? U
    : never
  : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof DatabaseWithoutInternals }
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
  ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
  : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never
> = PublicCompositeTypeNameOrOptions extends { schema: keyof DatabaseWithoutInternals }
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
  ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
  : never

export const Constants = {
  "graphql_public": {
          Enums: {
            
          }
        },"public": {
          Enums: {
            "app_role": ["student", "officer", "admin"],"application_status": ["draft", "submitted", "under_review", "shortlisted", "approved", "rejected", "withdrawn"],"placement_type": ["attachment", "internship"]
          }
        }
} as const
